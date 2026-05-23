"""Sledopyt AI logos in the LogoLounge 2025 BlurTails + Scalers trends."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
OUT_DIR = "/app/frontend/public/assets/logos"
os.makedirs(OUT_DIR, exist_ok=True)

BASE = (
    "Brand: Sledopyt AI (Sledopyt = 'pathfinder/tracker' in Russian). "
    "Output: ONE square 1024x1024 logo, generous padding, centered, no watermark, no extra labels. "
    "Wordmark must spell exactly 'Sledopyt AI' — no other words. "
    "Background: pure white #FFFFFF (these are editorial/print-style trend studies, like LogoLounge). "
    "Clean, refined, professional, no distressed textures, no cartoon, no 3D — flat 2D vector look. "
)

CONCEPTS = {
    # ---------- BlurTails (gradient motion-blur trails) ----------
    "11-blurtail-wordmark": (
        "Trend: BlurTails. Logo is a horizontal wordmark 'Sledopyt AI' in a clean modern sans-serif "
        "(Inter / Söhne / Helvetica Now), medium weight, near-black color #0B0B0F. "
        "Behind the wordmark and extending to the LEFT, a long soft gradient motion-blur trail of "
        "the same letters fading from a vibrant electric blue #4285F4 through magenta into transparent, "
        "as if the wordmark just darted forward from offscreen. The blur should look like a Gaussian "
        "smear trailing behind. Solid sharp text in front, smudged ghost behind. White background."
    ),
    "12-blurtail-letter-s": (
        "Trend: BlurTails. Single iconic letterform 'S' in a strong geometric sans-serif, "
        "solid black #0B0B0F, sharp and crisp. Behind it, 4-5 ghost duplicates of the same S, each "
        "progressively offset further to the left, smaller, and more blurred, tinted with a smooth "
        "gradient fading through blue #4285F4 → purple → pink → transparent. Like the S is "
        "sprinting forward and leaving optical afterimages. Below the mark in tiny clean type: "
        "'Sledopyt AI' in light grey, evenly tracked. White background."
    ),
    "13-blurtail-arrow": (
        "Trend: BlurTails. The mark is a sharp solid black cursor-arrow / paper-plane icon pointing "
        "to the upper-right, with a long soft gradient vapor trail wafting off the back of the arrow "
        "— the trail is a soft cloud/smear blending from translucent black through electric blue "
        "#4285F4 into transparent. Trail curves slightly as if the arrow just whipped through. "
        "Wordmark 'Sledopyt AI' sits below in clean medium-weight sans-serif, dark grey. "
        "Spacious composition, white background."
    ),
    # ---------- Scalers (progressive stepped strokes) ----------
    "14-scaler-S-bars": (
        "Trend: Scalers. The letter 'S' constructed from a sequence of progressively taller vertical "
        "bars/strokes (the way Dylan Menke designed the 'B' for the Scalers trend), arranged in two "
        "horizontal rows that together silhouette an 'S'. Each bar is a slightly different shade of "
        "blue ascending from light sky-blue to deep navy #4285F4. The bars have a small flat top, "
        "feel orderly and rhythmic. Beside or below the mark: 'Sledopyt AI' in clean uppercase "
        "sans-serif, dark navy, generous letter-spacing. White background, lots of negative space."
    ),
    "15-scaler-stepped-stairs": (
        "Trend: Scalers. Above the wordmark, a row of 5-7 thin vertical bars increasing in height "
        "from left to right like a stylized staircase / equalizer / bar chart climbing upward, each "
        "bar electric blue #4285F4, evenly spaced. Below them a clean modern wordmark 'Sledopyt AI' "
        "in dark navy uppercase sans-serif with generous letter-spacing. Editorial, calm, corporate-"
        "confident, 2025 LogoLounge Scalers look. White background."
    ),
    "16-scaler-footprint-path": (
        "Trend: Scalers. A minimalist icon: a sequence of 4 evenly-spaced flat horizontal strokes "
        "growing progressively wider from bottom to top (like a path receding into the distance, or "
        "footsteps growing closer), each stroke in a slightly deeper shade of blue #4285F4 with the "
        "top stroke a strong navy. The composition silhouettes a forward-leaning arrow. "
        "Wordmark 'Sledopyt AI' below in clean medium-weight sans-serif, dark navy, tracked. "
        "White background, plenty of breathing room."
    ),
}


async def gen(name: str, prompt: str):
    chat = LlmChat(api_key=API_KEY, session_id=f"logo-{name}", system_message="You are a logo designer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=f"{BASE}\n\n{prompt}")
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] no image. text={text[:120]}")
        return False
    img_bytes = base64.b64decode(images[0]["data"])
    path = os.path.join(OUT_DIR, f"{name}.png")
    with open(path, "wb") as f:
        f.write(img_bytes)
    print(f"[{name}] saved -> {path} ({len(img_bytes)//1024} KB)")
    return True


async def main():
    results = await asyncio.gather(*[gen(n, p) for n, p in CONCEPTS.items()], return_exceptions=True)
    for n, r in zip(CONCEPTS.keys(), results):
        if isinstance(r, Exception):
            print(f"[{n}] ERROR: {r}")


if __name__ == "__main__":
    asyncio.run(main())
