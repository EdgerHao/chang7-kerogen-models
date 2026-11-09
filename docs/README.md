# Chang 7 molecular-model website

Static GitHub Pages website for the five candidate molecular graphs from release v0.1.0.

- index.html: interactive explorer.
- gallery.html: ChimeraX plates and full/indexed 2-D depictions.
- atlas/: connection-indexed 2-D atlases, with paired L labels referring to original bonds.
- models/: byte-identical copies of source SDF/SMILES/metadata used for website downloads.
- vendor/: 3Dmol.js 2.5.5 and its third-party license notices.

All molecular graphs and source coordinates are unchanged. Rigid display transforms and
hydrogen visibility are viewing choices only. Molecular surfaces are geometric envelopes
of these candidate coordinates, not measured pores, electrostatic potentials or validated
wettability results. The dense full 2-D graphs retain crossings; use the indexed atlases
to inspect the local connectivity.

Serve this directory directly or configure GitHub Pages to publish main:/docs.
Model/figure data: CC BY 4.0. Original website code: MIT. 3Dmol.js: BSD and included notices.

The public site defaults to English. The header language buttons switch between English
and Chinese, preserve the current model/view, and remember the preference across pages.
