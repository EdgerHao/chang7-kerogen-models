# Chang 7 kerogen molecular models

Five **nonunique candidate molecular graphs** for Y21-1 to Y21-5, accompanied by
their connectivity-consistent, illustrative locally relaxed conformers. The
assigned Easy Ro endpoint labels are 0.7%, 0.9%, 1.1%, 1.3%, and 1.6%; they are
experimental labels, not five independently measured reflectances.

Release: **v0.1.0**. Associated manuscript: *Aliphatic Depletion and Relative
Aromatic Enrichment in Chang 7 Kerogen during Hydrous Semi-Open Pyrolysis*
(author review draft; no journal DOI is claimed).

## Interactive visualization

Open the [five-model interactive explorer](https://edgerhao.github.io/chang7-kerogen-models/)
or the [ChimeraX figures and 2-D structure gallery](https://edgerhao.github.io/chang7-kerogen-models/gallery.html).
No installation is required. Rotate/zoom the candidates, inspect original SDF atom IDs,
switch ball-and-stick / skeleton / geometric-surface views, and download the source SDF.

The website uses the unchanged v0.1.0 molecular data. Display transformations,
hydrogen hiding and molecular surfaces are visualization choices, not new structural
validation or predictive simulations. Web code is MIT; bundled 3Dmol.js carries its
own BSD/third-party licenses in docs/vendor/. Figures and model data are CC BY 4.0.

## Download and use

Download the versioned package from [Releases](https://github.com/EdgerHao/chang7-kerogen-models/releases),
or clone this repository. No original knowledge-vault history is included.

```bash
git clone https://github.com/EdgerHao/chang7-kerogen-models.git
cd chang7-kerogen-models
python -m pip install -r requirements.txt
python scripts/validate_models.py
python examples/load_and_analyze.py
```

## Formats and conventions

| Files | Intended use | Information retained |
| --- | --- | --- |
| models/models.sdf; models/Y21-*/model.sdf | Preferred batch/individual chemical exchange | Explicit H, atom order, bonds, coordinates and model metadata |
| model.mol | Common desktop chemistry tools | Explicit H, bonds and the same coordinates |
| model.smi; models/SMILES.tsv | Search, graph reconstruction, descriptor analysis | Canonical constitutional graph; no coordinates or specified stereochemistry |
| model.xyz | Broad coordinate-viewer and quantum-chemistry interoperability | Elements and Cartesian coordinates in angstrom; no authoritative bond orders |
| model.pdb | Compatibility/viewing | Same atom order and coordinates, with CONECT; SDF remains authoritative for chemistry |
| topology.json | Transparent programmatic inspection | One-based atom IDs, coordinates, formal charge, aromatic flags and bond orders |
| metadata.json | Provenance and interpretation | Formula, counts, assigned endpoint, local-relaxation record and geometry diagnostics |

The explicit-atom order is identical across SDF, MOL, XYZ, PDB and topology.json.
SMILES ordering need not match coordinate-file ordering. No periodic cell,
force-field atom types, partial charges, GROMACS topology or LAMMPS data file is
invented. MOL2 atom typing/charges and force-field-specific MD inputs should be
generated only after selecting and validating an appropriate parameterization.

## What was checked

The validator checks every published file checksum; valid connected graphs;
agreement of SDF/MOL/PDB with canonical SMILES; molecular formulas; explicit H;
coordinate order and precision; and all five records in the batch SDF.
It is a file/chemical-graph audit, **not independent experimental validation**.

Each graph is one possible representation assembled from composition targets,
operational CP/MAS responses and modeling assumptions. Functional-group placement,
crosslink topology and stereochemistry are not uniquely established. Source
stereochemistry is unspecified; coordinate snapshots do not determine absolute
configuration.

The coordinates are the same illustrative MMFF94 local-relaxation results used
in the manuscript audit, not new equilibrated bulk structures. Numerical
minimizer convergence does not imply a global minimum or MD readiness. Some
models retain stretched C-C bonds (counts and bond-length ranges are explicitly
recorded in metadata); users must prepare and validate geometry/force fields
before predictive simulations. Energies of different formulas must not be used
as a thermodynamic ranking. No density, adsorption, wettability or other property
prediction is validated by this release.

## Reuse, citation and provenance

Model data/derived metadata: [CC BY 4.0](DATA-LICENSE.md). Code/examples: [MIT](LICENSE).
Please cite the exact release and indicate any modifications. CITATION.cff enables
GitHub's “Cite this repository” feature. No Zenodo DOI or accepted-paper status is
implied. Source checksums and numerical relaxation records are in provenance/;
they contain no local computer paths. Raw instrument reports, thesis files,
third-party workbooks and unrelated author data are outside this release.

Format choices follow the [RDKit I/O documentation](https://www.rdkit.org/docs/source/rdkit.Chem.rdmolfiles.html)
and the [Open Babel XYZ specification](https://openbabel.org/docs/FileFormats/XYZ_cartesian_coordinates_format.html).
XYZ model sharing also has a [kerogen-model precedent](https://doi.org/10.1021/ef502154k).

Report graph/format issues through the repository Issues page. Include the
model ID, release tag, software version and a small reproducible example.
