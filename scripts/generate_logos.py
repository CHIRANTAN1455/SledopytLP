"""Generate 4 logo concepts for Sledopyt AI using Gemini Nano Banana."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
OUT_DIR = "/app/frontend/public/assets/logos"
os.makedirs(OUT_DIR, exist_ok=True)

BRAND = (
    "Brand: Sledopyt AI. Sledopyt means 'pathfinder/tracker' in Russian. "
    "Aesthetic: minimal, dark, terminal/coder vibe. "
    "Background: pure black #000000. "
    "Mark color: white #FFFFFF with a single accent in blue #4285F4. "
    "Wordmark uses JetBrains Mono or Fira Code monospace font, medium weight, tight kerning. "
    "Logo must be ultra-clean vector-style, flat, no gradients on the mark, no 3D, no drop shadows, "
    "no generic neural blobs or swirls. Square 1024x1024 canvas, generous padding, centered."
)

CONCEPTS = {
    "01-cursor-pathfinder": (
        "Concept: 'Cursor Pathfinder'. A blinking terminal block-cursor that leaves a trail of "
        "small dots curving like a constellation/footprint trail behind it, ending in a tiny "
        "chevron arrowhead. Below the mark, the wordmark 'Sledopyt AI' in monospace where 'AI' "
        "is in #4285F4 blue and 'Sledopyt' is white. Mark sits above the wordmark."
    ),
    "02-ascii-arrow": (
        "Concept: 'ASCII Signal'. The logo mark is an ASCII-style arrow built from monospace "
        "characters: a dash, dash, then a chevron arrowhead, like '──>' but stylized cleanly. "
        "A single blue #4285F4 dot prefixes it (similar to a status indicator). Below it, "
        "wordmark 'Sledopyt AI' in monospace, 'AI' colored #4285F4, the rest white."
    ),
    "03-neural-constellation-s": (
        "Concept: 'Neural Constellation S'. Five small glowing dots arranged to form the letter S, "
        "connected with thin hairline white strokes. The dots are #4285F4 blue with subtle soft glow. "
        "It must read clearly as both an S and a star constellation. Below the mark, monospace "
        "wordmark 'Sledopyt AI' — 'AI' in #4285F4, rest white. No background stars, keep it clean."
    ),
    "04-loading-bar-wordmark": (
        "Concept: 'Loading Bar Wordmark'. A single horizontal wordmark only (no separate icon). "
        "'Sledopyt [████████░░] AI' rendered in monospace font. The brackets and filled blocks form "
        "a loading bar inside the wordmark. Filled blocks transition from white to #4285F4 blue "
        "from left to right. 'AI' at the end is #4285F4. 'Sledopyt' is white. Strong dev-native feel."
    ),
}


async def gen(name: str, prompt: str):
    chat = LlmChat(api_key=API_KEY, session_id=f"logo-{name}", system_message="You are a logo designer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=f"{BRAND}\n\n{prompt}\n\nGenerate ONE final logo image, 1024x1024, black background.")
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] no image returned. text={text[:120]}")
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
