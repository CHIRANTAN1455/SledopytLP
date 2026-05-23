"""Generate Gen-Z styled logo concepts for Sledopyt AI."""
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
    "Brand: Sledopyt AI (Sledopyt = 'pathfinder' in Russian). "
    "Output: ONE square 1024x1024 logo, generous padding, centered, no watermark, no extra text. "
    "Wordmark must spell exactly 'Sledopyt AI' — never any other text. "
)

CONCEPTS = {
    "05-y2k-chrome": (
        "Concept: Y2K chrome liquid metal. The mark is a glossy 3D chrome blob shaped like a "
        "stylized arrow/cursor, with iridescent purple-blue-silver reflections, soft studio "
        "lighting on pure black background. Below it the wordmark 'Sledopyt AI' in a thick "
        "rounded display font, chrome gradient text with subtle holographic edge. Y2K 2002 vibe. "
        "Aesthetic: Apple G4, Frutiger Aero, futuristic, very Gen-Z 2025 nostalgia."
    ),
    "06-acid-sticker": (
        "Concept: acid sticker. Logo is a die-cut sticker on black background — a bold cartoon "
        "compass-arrow icon with thick 4px black outline, fluorescent lime-green and electric "
        "blue fill, slightly tilted, with a thin white halo around the entire sticker like a "
        "die-cut. Below it the wordmark 'Sledopyt AI' in chunky rounded sans-serif also outlined "
        "in black, fluorescent green for 'Sledopyt' and electric blue for 'AI'. Sticker-shop, "
        "Depop, streetwear sticker pack vibe."
    ),
    "07-pixel-mascot": (
        "Concept: 8-bit pixel art mascot. A tiny 32x32 pixel character that looks like a small "
        "explorer/tracker with binoculars and a glowing pixel arrow above its head, drawn in "
        "limited palette: white, cyan, electric blue #4285F4, dark navy. Black background. "
        "Below the pixel mascot, the wordmark 'Sledopyt AI' rendered in clean pixel-font "
        "(VT323 or Press Start 2P style), white with the 'AI' in cyan. Retro NES/Game Boy vibe."
    ),
    "08-vaporwave-glitch": (
        "Concept: vaporwave glitch. The wordmark 'Sledopyt.AI' rendered in a bold geometric "
        "display font with a magenta+cyan RGB-split glitch effect (offset red-cyan channels), "
        "subtle horizontal VHS scanlines across it, set against a black background with a thin "
        "neon pink retro perspective grid receding to a vanishing point at the bottom. A small "
        "palm-tree or sun silhouette behind the text. 1980s Miami / vaporwave aesthetic, "
        "very Gen-Z Tumblr."
    ),
    "09-squishy-3d": (
        "Concept: squishy inflated 3D. The wordmark 'Sledopyt AI' rendered as plump glossy "
        "inflated 3D balloon letters with soft pastel iridescent gradient (mint green, baby blue, "
        "lavender, peach), soft shadow on black background. Letters look squishy and bouncy "
        "like jelly. No icon — wordmark-only. Pinterest / Instagram 2024-2025 trend, very "
        "Gen-Z, Apple Vision Pro style soft 3D."
    ),
    "10-brutalist-zine": (
        "Concept: brutalist photocopy zine. Logo on black background. A chunky off-kilter "
        "monospace wordmark 'SLEDOPYT AI' in all caps, in stark hi-contrast electric yellow "
        "(#FFFF00), slightly photocopied/distressed edges, with a thick rough underline. Above "
        "it a tiny rough hand-drawn arrow scribble in white. Zine, punk-flyer, brutalist "
        "design, Pangaia / 2025 Gen-Z streetwear vibe."
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
