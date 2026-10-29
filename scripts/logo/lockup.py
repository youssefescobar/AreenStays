# Builds the full Areen lockup SVG: mark + Arabic and English wordmarks as per-glyph paths.
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from mark import mark_group, DEFS, STYLE
import sys

FONTS = sys.argv[1]
W = 1000

def shape(font_path, text, size, tracking=0, rtl=False):
    """Returns ([(d, char)], width) with glyph paths at origin baseline 0, in px."""
    blob = hb.Blob.from_file_path(font_path)
    face = hb.Face(blob); font = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    tt = TTFont(font_path); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    upm = tt["head"].unitsPerEm; k = size / upm
    x = 0; out = []
    infos, poss = buf.glyph_infos, buf.glyph_positions
    for i, (info, pos) in enumerate(zip(infos, poss)):
        name = order[info.codepoint]
        pen = SVGPathPen(gs)
        gs[name].draw(TransformPen(pen, (k, 0, 0, -k, x + pos.x_offset * k, -pos.y_offset * k)))
        d = pen.getCommands()
        if d:
            out.append((d, text[info.cluster]))
        x += pos.x_advance * k + (tracking if i < len(infos) - 1 else 0)
    return out, x

def offset(d, dx, dy):
    # re-emit path with absolute offset by drawing again would be cleaner; SVGPathPen emits absolute coords
    import re
    toks = re.findall(r"[MLQCZHVmlqczhv]|-?\d*\.?\d+(?:e-?\d+)?", d)
    res = []; cmd = None; idx = 0
    for t in toks:
        if t.isalpha():
            cmd = t; idx = 0; res.append(t); continue
        v = float(t)
        if cmd == "H": v += dx
        elif cmd == "V": v += dy
        else:
            v += dx if idx % 2 == 0 else dy
        idx += 1
        res.append(f"{v:.1f}".rstrip("0").rstrip("."))
    return " ".join(res)

def line(font, text, size, tracking, y, cls, idp, rtl=False):
    glyphs, width = shape(f"{FONTS}/{font}", text, size, tracking, rtl)
    x0 = (W - width) / 2
    parts = []
    for i, (d, ch) in enumerate(glyphs):
        parts.append(f'      <path class="areen-letter" data-char="{ch}" style="--i:{i}" d="{offset(d, x0, y)}" />')
    return parts, x0, width

ar, _, _ = line("tajawal-700.ttf", "أرين البساتين", 152, 0, 716, "", "ar", rtl=True)
en, enx, enw = line("montserrat-500.ttf", "AREEN ALBASATEEN", 52, 24, 820, "", "en")
ho, hox, how = line("montserrat-500.ttf", "HOTEL", 44, 36, 904, "", "hotel")

MARK_SCALE = 0.68
mx = (W - 914 * MARK_SCALE) / 2
rule_y = 886
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} 930" role="img" aria-label="Areen Albasateen Hotel">{DEFS}{STYLE}
  <g id="areen-mark-wrap" transform="translate({mx:.1f} 0) scale({MARK_SCALE})">
  {mark_group()}
  </g>
  <g id="wordmark-ar" class="areen-gold-text" fill="url(#areen-gold-text)">
{chr(10).join(ar)}
  </g>
  <g id="wordmark-en" class="areen-gold-text" fill="url(#areen-gold-text)">
{chr(10).join(en)}
  </g>
  <g id="wordmark-hotel" fill="url(#areen-gold-text)">
    <rect id="rule-left" x="{enx:.1f}" y="{rule_y}" width="{hox - 40 - enx:.1f}" height="3" />
    <rect id="rule-right" x="{hox + how + 40:.1f}" y="{rule_y}" width="{enx + enw - (hox + how + 40):.1f}" height="3" />
{chr(10).join(ho)}
  </g>
</svg>'''
svg = svg.replace("</defs>", '''  <linearGradient id="areen-gold-text" gradientUnits="userSpaceOnUse" x1="0" y1="590" x2="0" y2="910">
      <stop offset="0" stop-color="#F6E6B4" />
      <stop offset="0.4" stop-color="#D9B866" />
      <stop offset="0.55" stop-color="#A9843A" />
      <stop offset="0.7" stop-color="#E6CC8C" />
      <stop offset="1" stop-color="#B38D45" />
    </linearGradient>
  </defs>''', 1)
print(svg)
