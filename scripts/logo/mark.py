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
              ("C", [(262, 352), (336, 410), (374, 476)]),
              ("C", [(420, 560), (446, 680), (452, 770)])]
leaf_hole = [("M", [(432, 744)]),
             ("C", [(350, 662), (238, 582), (226, 478)]),
             ("L", [(212, 350)]),
             ("C", [(276, 382), (330, 430), (356, 486)]),
             ("C", [(394, 570), (422, 662), (432, 744)])]

inner_crystal = [(216, 354), (296, 400), (354, 488), (430, 740), (230, 480)]
inner_facets = [[(216, 354), (326, 560), (430, 740)], [(296, 400), (326, 560)], [(230, 480), (326, 560)]]

outer_crystal = [(28, 490), (150, 487), (300, 590), (410, 712), (160, 668)]
outer_facets = [[(28, 490), (215, 590), (410, 712)], [(150, 487), (215, 590)], [(160, 668), (215, 590)], [(90, 560), (215, 590)]]

swoosh = [("M", [(126, 676)]),
          ("C", [(270, 656), (392, 718), (448, 806)]),
          ("C", [(380, 752), (270, 696), (126, 676)])]

def pl(pts):
    return "M" + " L".join(f"{x:g} {y:g}" for x, y in pts)

def side(name, flip):
    m = (lambda p: mirror(p)) if flip else (lambda p: p)
    mp = (lambda c: mirror_path(c)) if flip else (lambda c: c)
    return f'''
    <g id="outer-crystal-{name}" class="areen-crystal areen-outer-crystal">
      <path d="{poly(m(outer_crystal))}" fill="url(#areen-crystal)" />
      <path class="areen-facets" d="{' '.join(pl(m(f)) for f in outer_facets)}" />
    </g>
    <path id="swoosh-{name}" class="areen-gold areen-swoosh" d="{path(mp(swoosh))}" fill="url(#areen-gold)" />
    <g id="inner-crystal-{name}" class="areen-crystal areen-inner-crystal">
      <path d="{poly(m(inner_crystal))}" fill="url(#areen-crystal-deep)" />
      <path class="areen-facets" d="{' '.join(pl(m(f)) for f in inner_facets)}" />
    </g>
    <path id="leaf-{name}" class="areen-gold areen-leaf" d="{path(mp(leaf_outer))} {path(mp(leaf_hole))}" fill="url(#areen-gold)" fill-rule="evenodd" />
    <g id="center-crystal-{name}" class="areen-crystal areen-center-crystal">
      <path d="{poly(m(center_outer))}" fill="url(#areen-crystal-deep)" />
      <path d="{poly(m(center_light))}" fill="url(#areen-crystal)" opacity="0.9" />
      <path class="areen-facets" d="{pl(m(center_facet))}" />
    </g>'''

DEFS = '''
  <defs>
    <linearGradient id="areen-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6E3A1" />
      <stop offset="0.45" stop-color="#D4AF37" />
      <stop offset="1" stop-color="#A27E22" />
    </linearGradient>
    <linearGradient id="areen-crystal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E4F0FA" />
      <stop offset="0.5" stop-color="#A7C6E0" />
      <stop offset="1" stop-color="#5B8FB7" />
    </linearGradient>
    <linearGradient id="areen-crystal-deep" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#A7C6E0" />
      <stop offset="0.55" stop-color="#5B8FB7" />
      <stop offset="1" stop-color="#2B5578" />
    </linearGradient>
  </defs>'''

STYLE = '''
  <style>
    .areen-facets { fill: none; stroke: #FFFFFF; stroke-opacity: 0.55; stroke-width: 2; stroke-linejoin: round; }
  </style>'''

def mark_group():
    return f'''<g id="areen-mark">
    <g id="areen-left">{side("left", False)}
    </g>
    <g id="areen-right">{side("right", True)}
    </g>
    <path id="areen-star" class="areen-gold" d="{star}" fill="url(#areen-gold)" />
  </g>'''

if __name__ == "__main__":
    print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 914 820" role="img" aria-label="Areen Albasateen Hotel">{DEFS}{STYLE}\n  {mark_group()}\n</svg>')
