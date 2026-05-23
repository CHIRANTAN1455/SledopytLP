"""Sledopyt AI logo replicating the Boundary Analytics layout exactly."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, FileContentWithMimeType

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
OUT_DIR = "/app/frontend/public/assets/logos"

PROMPT = (
    "Create a logo for the brand 'Sledopyt AI'. "
    "Replicate the EXACT visual structure of the reference image (Boundary Analytics). "
    "Specifications: \n"
    "- Pure black background (#000000), 1024x1024 square canvas, centered horizontally. \n"
    "- LEFT side: an icon mark made of two horizontal rows of thin tall vertical white bars. "
    "Each row contains 4-5 narrow rectangular strokes of varying heights arranged in an ASCENDING staircase "
    "(shorter on the left, growing taller to the right). The two rows are stacked vertically, mirroring each "
    "other to silhouette a vertical block of stepped 'piano keys' or 'equalizer bars'. Pure white. \n"
    "- A single thin vertical white divider line directly to the right of the icon, full height of the icon. \n"
    "- RIGHT side of the divider: a two-line stacked wordmark in a classic high-contrast serif typeface "
    "(Bodoni / Didot / Playfair Display style), pure white. \n"
    "  Line 1: 'Sledopyt' \n"
    "  Line 2: 'AI' \n"
    "  Both lines left-aligned, same x-height baseline as the icon, generous letter spacing. \n"
    "- The icon height must match the total height of the two stacked wordmark lines. \n"
    "- Refined, editorial, corporate. Flat 2D vector style. No gradients, no shadows, no 3D, no decorations, "
    "no extra text, no watermarks. \n"
    "Reference image attached — match its structure precisely, only swap the wordmark text."
)


async def gen(name: str, ref_path: str):
    chat = LlmChat(api_key=API_KEY, session_id=f"logo-{name}", system_message="You are a logo designer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])

    with open(ref_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    from emergentintegrations.llm.chat import ImageContent
    msg = UserMessage(text=PROMPT, file_contents=[ImageContent(b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] no image. text={text[:140]}")
        return
    out = os.path.join(OUT_DIR, f"{name}.png")
    with open(out, "wb") as f:
        f.write(base64.b64decode(images[0]["data"]))
    print(f"[{name}] saved -> {out}")


async def main():
    ref = "/tmp/boundary_ref.png"
    # Download user's attached reference
    import urllib.request
    url = "https://customer-assets.emergentagent.com/job_c4ab6ebe-a6a0-4e7c-b1e4-d56122a8e115/artifacts/dqxwlr70_Screenshot%202026-05-23%20at%207.31.25%E2%80%AFPM.png"
    urllib.request.urlretrieve(url, ref)
    # Generate 3 variants for choice
    await asyncio.gather(
        gen("17-boundary-style-a", ref),
        gen("17-boundary-style-b", ref),
        gen("17-boundary-style-c", ref),
    )


if __name__ == "__main__":
    asyncio.run(main())
