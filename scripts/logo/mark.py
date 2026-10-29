# Generates the Areen mark as named SVG parts. Coordinates traced from the brand sheet (920x840 space).
import sys
CX = 457  # axis of symmetry

def mirror(pts):
    return [(2*CX - x, y) for x, y in pts]

def poly(pts):
    return "M" + " L".join(f"{x:g} {y:g}" for x, y in pts) + " Z"

def mirror_path(cmds):
    # cmds: list of (op, [points])
    out = []
    for op, pts in cmds:
        out.append((op, mirror(pts)))
    return out

def path(cmds):
    s = []
    for op, pts in cmds:
        s.append(op + " ".join(f"{x:g} {y:g}" for x, y in pts))
    return " ".join(s) + " Z"

# --- parts (left side; right side mirrored) ---
star = "M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z"

center_outer = [(366, 202), (449, 284), (451, 708), (440, 722), (360, 432)]
center_facet = [(366, 202), (414, 264), (436, 712)]           # polyline
center_light = [(414, 264), (449, 284), (451, 708), (436, 712)]  # lit face

leaf_outer = [("M", [(446, 792)]),
              ("C", [(330, 705), (214, 610), (204, 478)]),
              ("L", [(184, 316)]),
              ("L", [(362, 462)]),
              ("C", [(414, 548), (446, 670), (452, 770)])]
leaf_hole = [("M", [(428, 730)]),
             ("C", [(350, 652), (246, 578), (236, 480)]),
             ("L", [(224, 372)]),
             ("L", [(330, 478)]),
             ("C", [(380, 560), (414, 650), (428, 730)])]

inner_crystal = [(226, 372), (326, 474), (384, 598), (426, 728), (238, 482)]
inner_facets = [[(216, 354), (326, 560), (430, 740)], [(296, 400), (326, 560)], [(230, 480), (326, 560)]]

outer_crystal = [(28, 490), (150, 487), (300, 590), (410, 712), (160, 668)]
outer_facets = [[(28, 490), (215, 590), (410, 712)], [(150, 487), (215, 590)], [(160, 668), (215, 590)], [(90, 560), (215, 590)]]

swoosh = [("M", [(126, 676)]),
          ("C", [(270, 656), (392, 718), (448, 806)]),
          ("C", [(380, 752), (270, 696), (126, 676)])]

def pl(pts):
    return "M" + " L".join(f"{x:g} {y:g}" for x, y in pts)

# Facet shading: each crystal is a fan of triangles around a core point, shaded dark -> light
outer_core = (215, 590)
outer_shades = ["glass-hi", "glass-mid", "glass-deep", "glass-dark", "glass-mid"]
inner_core = (318, 540)
inner_shades = ["glass-hi", "glass-mid", "glass-deep", "glass-dark", "glass-mid"]
center_dark = [(366, 202), (414, 264), (436, 712), (440, 722), (360, 432)]
center_lit = [(414, 264), (449, 284), (451, 708), (436, 712)]
center_glint = [(372, 236), (404, 262), (392, 420), (366, 380)]  # specular streak

def fan(outline, core, shades, m):
    out = []
    n = len(outline)
    for i in range(n):
        tri = m([outline[i], outline[(i + 1) % n], core])
        out.append(f'<path class="areen-facet" d="{poly(tri)}" fill="url(#areen-{shades[i]})" />')
    return "\n      ".join(out)

def side(name, flip):
    m = (lambda p: mirror(p)) if flip else (lambda p: p)
    mp = (lambda c: mirror_path(c)) if flip else (lambda c: c)
    return f"""
    <g id="outer-crystal-{name}" class="areen-crystal areen-outer-crystal">
      {fan(outer_crystal, outer_core, outer_shades, m)}
      <path class="areen-edge" d="{poly(m(outer_crystal))}" />
    </g>
    <path id="swoosh-{name}" class="areen-gold areen-swoosh" d="{path(mp(swoosh))}" fill="url(#areen-gold)" />
    <g id="inner-crystal-{name}" class="areen-crystal areen-inner-crystal">
      {fan(inner_crystal, inner_core, inner_shades, m)}
      <path class="areen-edge" d="{poly(m(inner_crystal))}" />
    </g>
    <path id="leaf-{name}" class="areen-gold areen-leaf" d="{path(mp(leaf_outer))} {path(mp(leaf_hole))}" fill="url(#areen-gold)" fill-rule="evenodd" />
    <g id="center-crystal-{name}" class="areen-crystal areen-center-crystal">
      <path class="areen-facet" d="{poly(m(center_dark))}" fill="url(#areen-glass-pillar{'-pale' if flip else ''})" />
      <path class="areen-facet" d="{poly(m(center_lit))}" fill="url(#areen-glass-pillar-lit)" />
      <path class="areen-glint" d="{poly(m(center_glint))}" fill="url(#areen-glint)" />
      <path class="areen-edge" d="{poly(m(center_dark))} {poly(m(center_lit))}" />
    </g>"""

def lg(id_, stops, x2="1", y2="1", x1="0", y1="0"):
    st = "".join(f'\n      <stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{a}"' if a is not None else "") + " />" for o, c, a in stops)
    return f'\n    <linearGradient id="{id_}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{st}\n    </linearGradient>'

DEFS = "\n  <defs>" + "".join([
    # metallic gold: dark bronze edges, bright band, warm mid
    lg("areen-gold", [(0, "#F6E6B4", None), (0.25, "#D9B866", None), (0.5, "#A9843A", None), (0.64, "#EBD39A", None), (0.84, "#C29C4E", None), (1, "#7C5F25", None)], x2="0.35", y2="1"),
    lg("areen-glass-hi", [(0, "#EAF3FB", 0.85), (0.5, "#9DBEDD", 0.6), (1, "#4D7DA8", 0.55)]),
    lg("areen-glass-mid", [(0, "#B9CEE2", 0.7), (0.45, "#5E86AD", 0.5), (1, "#0F2A47", 0.8)]),
    lg("areen-glass-deep", [(0, "#4C79A3", 0.55), (1, "#081F36", 0.9)]),
    lg("areen-glass-dark", [(0, "#163A5E", 0.8), (0.6, "#081F36", 0.85), (1, "#9CB9D6", 0.7)]),
    lg("areen-glass-pillar", [(0, "#6E98C0", 0.9), (0.3, "#1B3F64", 0.92), (0.75, "#0A2340", 0.95), (1, "#3D6B96", 0.9)], x2="1", y2="0.4"),
    lg("areen-glass-pillar-lit", [(0, "#DCEAF7", 0.95), (0.4, "#93B8DA", 0.92), (1, "#3E6D99", 0.92)], x2="0.3", y2="1"),
    lg("areen-glass-pillar-pale", [(0, "#D2E3F2", 0.85), (0.45, "#8FB2D3", 0.6), (1, "#4F7EA9", 0.7)], x2="1", y2="0.4"),
    lg("areen-glint", [(0, "#FFFFFF", 0.75), (1, "#FFFFFF", 0)], x2="0.2", y2="1"),
]) + """
    <filter id="areen-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dy="4" />
      <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>"""

STYLE = """
  <style>
    .areen-edge { fill: none; stroke: #EEF6FD; stroke-opacity: 0.9; stroke-width: 2.4; stroke-linejoin: round; }
    .areen-facet { stroke: #FFFFFF; stroke-opacity: 0.35; stroke-width: 1; stroke-linejoin: round; }
    .areen-gold { stroke: var(--areen-gap, #071E33); stroke-width: 6; paint-order: stroke; }
  </style>"""

def mark_group():
    return f'''<g id="areen-mark" filter="url(#areen-glow)">
    <g id="areen-left">{side("left", False)}
    </g>
    <g id="areen-right">{side("right", True)}
    </g>
    <path id="areen-star" class="areen-gold" d="{star}" fill="url(#areen-gold)" />
  </g>'''

if __name__ == "__main__":
    print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 914 820" role="img" aria-label="Areen Albasateen Hotel">{DEFS}{STYLE}\n  {mark_group()}\n</svg>')
