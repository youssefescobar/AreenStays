from pathlib import Path
from PIL import Image

src = Path(__file__).resolve().parents[1] / "Gemini_Generated_Image_v6tfwov6tfwov6tf.jpg"
out = Path(__file__).resolve().parents[1] / "public" / "mascot"
out.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGB")
w, h = im.size
cols, rows = 4, 2
cw, ch = w // cols, h // rows
pad = 4
size = 768

# Bust crops for circular FAB: head fills most of the circle; raised hands stay in frame.
# x_bias shifts crop toward a side hand (-1 left … +1 right).
# height_frac: how much of the cell height to use (higher = more torso/hands).
names = [
    ("idle", 0.0, 0.72),
    ("suggest", 0.2, 0.78),
    ("wave", 0.28, 0.82),
    ("think", -0.15, 0.8),
    ("explain", 0.0, 0.95),
    ("listen", 0.0, 0.72),
    ("happy", 0.0, 0.88),
    ("point", 0.22, 0.85),
]

for i, (name, x_bias, height_frac) in enumerate(names):
    r, c = divmod(i, cols)
    left = c * cw + pad
    top = r * ch + pad
    right = (c + 1) * cw - pad
    bottom = (r + 1) * ch - pad
    cell = im.crop((left, top, right, bottom))
    cw2, ch2 = cell.size

    side = min(cw2, int(ch2 * height_frac))
    leftover = cw2 - side
    left2 = int(leftover * (0.5 + x_bias * 0.5))
    left2 = max(0, min(left2, leftover))
    top2 = 0
    if top2 + side > ch2:
        top2 = ch2 - side

    face = cell.crop((left2, top2, left2 + side, top2 + side))
    face = face.resize((size, size), Image.Resampling.LANCZOS)
    face.save(out / f"{name}.webp", "WEBP", quality=92, method=6)
    face.save(out / f"{name}.png", "PNG", optimize=True)
    print(f"{name}: side={side} bias={x_bias} frac={height_frac}")

im.save(out / "sheet.jpg", "JPEG", quality=92)
print("done")
