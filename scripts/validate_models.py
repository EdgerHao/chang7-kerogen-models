#!/usr/bin/env python3
"""Validate checksums, chemical graphs, formulas, explicit H and coordinate order."""
from pathlib import Path
from collections import Counter
import hashlib,json,math
from rdkit import Chem
from rdkit.Chem import rdMolDescriptors

ROOT=Path(__file__).resolve().parents[1]


def main():
    manifest=json.loads((ROOT/'manifest.json').read_text())
    for name,expected in manifest['sha256'].items():
        assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==expected, name
    entries=json.loads((ROOT/'models/metadata.json').read_text());assert len(entries)==5
    for entry in entries:
        folder=ROOT/'models'/entry['model_id']
        smi=Chem.MolFromSmiles((folder/'model.smi').read_text().strip())
        sdf=next(iter(Chem.SDMolSupplier(str(folder/'model.sdf'),removeHs=False)))
        mol=Chem.MolFromMolFile(str(folder/'model.mol'),removeHs=False)
        pdb=Chem.MolFromPDBFile(str(folder/'model.pdb'),removeHs=False,proximityBonding=False)
        canonical=lambda m:Chem.MolToSmiles(Chem.RemoveHs(m),isomericSmiles=False)
        assert smi is not None and sdf is not None and mol is not None and pdb is not None
        assert canonical(smi)==canonical(sdf)==canonical(mol)==canonical(pdb)==entry['canonical_smiles']
        assert rdMolDescriptors.CalcMolFormula(sdf)==entry['formula']
        assert dict(Counter(a.GetSymbol() for a in sdf.GetAtoms()))==entry['elements_including_explicit_H']
        assert len(Chem.GetMolFrags(sdf))==1 and sdf.GetNumAtoms()==entry['atoms_including_H']
        topology=json.loads((folder/'topology.json').read_text())
        assert len(topology['atoms'])==sdf.GetNumAtoms() and len(topology['bonds'])==sdf.GetNumBonds()
        xyz=(folder/'model.xyz').read_text().splitlines();assert int(xyz[0])==sdf.GetNumAtoms()
        for i,(line,atom) in enumerate(zip(xyz[2:],sdf.GetAtoms())):
            fields=line.split();assert fields[0]==atom.GetSymbol()
            pos=sdf.GetConformer().GetAtomPosition(i);pdbpos=pdb.GetConformer().GetAtomPosition(i)
            for observed,reference in zip(map(float,fields[1:]),pos):assert abs(observed-reference)<1e-5
            for observed,reference in zip(pdbpos,pos):assert abs(observed-reference)<.0011
        assert len(xyz[2:])==sdf.GetNumAtoms()
        assert all(math.isfinite(v) for atom in topology['atoms'] for k,v in atom.items() if k.endswith('_angstrom'))
        print(entry['model_id'],entry['formula'],'graph/formula/H/order/coordinates: PASS')
    combined=list(Chem.SDMolSupplier(str(ROOT/'models/models.sdf'),removeHs=False));assert len(combined)==5 and all(combined)
    print('All five models and',len(manifest['sha256']),'file checksums passed. This is a file/graph audit, not physical validation.')


if __name__=='__main__':main()
