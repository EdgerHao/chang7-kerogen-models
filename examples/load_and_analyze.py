from pathlib import Path
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

root=Path(__file__).resolve().parents[1]
for mol in Chem.SDMolSupplier(str(root/'models/models.sdf'),removeHs=False):
    if mol is None:raise ValueError('A model could not be parsed')
    aromatic_c=sum(a.GetAtomicNum()==6 and a.GetIsAromatic() for a in mol.GetAtoms())
    print(mol.GetProp('model_id'),rdMolDescriptors.CalcMolFormula(mol),round(Descriptors.MolWt(mol),3),aromatic_c)
