---
tags: model
summary: The central dogma of proteins is that with the understanding of the structure of a protein, comes the understanding of its function. We utilised fold recognition template modelling with the i-TASSER server to impose a reasonable 3D structure onto a sequence of peptides. After the refinement of these monomer models with molecular dynamics simulations, dimers and a larger 12mer complex was constructed to lead to an atomic understanding of how heat shock proteins function.
image: rsz_12_mer_colourful_image.png

---

## Aim
While investigating the existing literature for the mechanisms behind algal small heat shock proteins, we realised that species studied for conservation are very underserved by protein structure research. All that could be summarised was that small heat shock proteins form dimers which may then assemble further into 12mer-32mer complexes. (1) This served as our first lead in investigating the holdase function of HSP22E/F.

A protein’s structure determines its function. A peptide sequence is composed of amino acids that have side chains with various chemical properties. Due to the particular sequence of these amino acids, various side chains at different distances will attract and repel, and then self-assemble into its native state(s) in a matter of milliseconds. (2) This is important to remember when performing molecular dynamics simulations. Such simulations are usually on the timescale of nanoseconds (e-9) while protein folding happens on the order of milliseconds (e-3) and protein-protein interactions like that of dimer formation may take seconds as evidenced in typical molecular assays. Longer simulations require ever more computational resources and time to simulate. As such, molecular dynamics are best for refining protein structures that are suspected to be quite close to their native conformation.

## Structure Determination
There are no known heat shock protein structures from *C. reinhardtii* that have been experimentally determined. However, the amino acid sequences of *C. reinhardtii* heat shock proteins are known, specifically - HSP22E, HSP22F and HSP22G - which our team decided to predict the structure of to help with the understanding of their function. These heat shock proteins were chosen as HSP22G was predicted to localise to mitochondria and while HSP22E and HSP22F localised to chloroplasts. (1) After running a blastp (3) search on all of these proteins with the PDB database, (4) it was found that HSP22G had quite low sequence identity of ~25%, insignificant E values and low query coverage with the other known structural PDB hits. In contrast, HSP22E and HSP22F both had higher percentage identities ranging from ~28-50%, significant E values and higher percentage coverage. For this reason, the team changed to predict the structures of HSP22E and HSP22F instead of HSP22G. Even though the hits for HSP22E and HSP22F were better than the hits for HSP22G, they were all very similar and it was hard to definitively select one to be used as a template for homology modelling. A fold recognition and template modelling server, I-TASSER (5–7), was used to create models for HSP22E and HSP22F based on the best templates found by I-TASSER using a threading approach. The highest ranking models for both the HSP22E and HSP22F sequences were chosen as the starting structural models to be further refined and used in future molecular dynamic simulations (Figures 1 and 2). Both the I-TASSER models were based on the same PDB template structure 1GME (8) which is another eukaryotic small heat shock protein that forms a 12-mer complex made up of 6 dimers bound together. Interestingly, the literature on *C. reinhardtii* small heat shock proteins propose that they form dimers and further form larger oligomers ranging from 12 to 32 subunits (1).

{{
'/assets/images/model/HSP22E_itasser.png#Figure 1: the best scoring I-TASSER model for HSP22E SPLIT /assets/images/model/HSP22F_itasser.png#Figure 2: the best scoring I-TASSER model for HSP22F' | sideBySide 
}}


## Structure Refinement
I-TASSER unlike other template based methods builds models with multiple templates rather than a single template sometimes resulting in models with backbone torsion angles that are energetically unfavourable. More broadly the practice of imposing the structure of a known protein onto our similar protein aims to get a largely correct global topology but might not be so accurate at a local level. (9) As such, refinement must be conducted to ‘flex’ structures into more energetically favourable configurations. MolProbity, (10) was used to evaluate the viability of structures before and after each stage of refinement. Refinement was first targeted at improving the rotamers for the local structure and then globally improving atom clashes.

We hope that our exercise in refinement will shed some light on rather opaque metrics and software. Measures to pay particular attention to:

- Clashscore
    - Number of serious overlap between pairs of nonbonded atoms
    - Lower is better
- Poor/Favoured Rotamers
    - Quality of placement of side chains
    - Lower is better
- MolProbity Score
    - Log-weighted combination of clashscore, percentage Ramachandran not favored and percentage bad side-chain rotamers
    - Lower is better


### Pre-refinement MolProbity

{{
'/assets/images/model/sHSP22E_molprobity_prefinement.png#Figure 3: MolProbity Scoring for prerefinement HSP22E' | sideBySide
}}
{{
'/assets/images/model/sHSP22F_molprobity_prerefinement.png#Figure 4: MolProbity Scoring for prerefinement HSP22F' | sideBySide
}}



[/code.zip](Zip file of scripts, inputs, outputs that pertain to figures)
