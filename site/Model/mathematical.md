---
title: Mathematical Modelling
# subtitle: Modelling biochemical reactions to determine the effectiveness of PROTECC Coral
tags: model
summary: We modelled the main biochemical reaction happening inside Symbiodinium to determine the effectiveness of our Wet lab solution. In this model we consider the addition of sHSP and glutathionine. *WHAT WE FOUND GOES HERE*
image: zelun
---

{% include mathjax.html %}

$$k = \frac{1}{2}$$
$$\ce{CO2 + C -> 2 CO}$$

## Why mathematical modelling

Mathematical modelling is a powerful tool for verifiying and evaluating sythetic biology solutions. Since the ultimate target chasis Symbiodinium is nigh impossible to work with, *in silico* verification comes in as a alternative to the normal *in vovo* strategy. In this mathematical model we will consider the effect of the introduction of HSP22E, HSP22F and Glutathione into the system. We hope this model was able to facilitate our understanding of how HSP22E, HSP22F and Glutathione is able to alleviate the cell condition in a quantitative manner. However as with all modelling, care must be taken to select values and parameters that reflect the real world.

<!-- We choose to use mathematical modelling to simulate the in-vitro conditions of symbiodinium that would result from the PROTECC Coral solution. -->

## Aim
The aim was to produce a model that shows the effectiveness of the solution and provides insight into how varying the quantities of HSP22E, HSP22F and gluthationine would effect the cell's response under various temperatures. We further aimed to figure out the optimal condition for a cell to trigger the thermal protective response we designed for the cell.

## Implementation
Contray to the fact that many papers have studies the structure of the heat shock protein families, studies of mathematical model on the heat shock activity remain sparse. However we were able to find a paper by Carole J. Proctor (cite) which model the activity of chaperones given that the misfolded protein by are caused by high level of ROS. 
### Computational Language and tool
From the original paper the model was written base on the SBML(System Biology Markup Language) which is a langauge developed specifically for system biology base on XML(cite The Systems Biology Markup Language (SBML): Language Specification for Level 3 Version 1 Core
). However, due to the unfamiliarity of the language, we decided to switch another software package [PySB](https://pysb.org) developed by members of the Lopez Lab at Vanderbilt University and the Sorger Lab at Harvard Medical School(cite the pysb paper). We found this python package very user-frinedly while the same time provides powerful solvers for the system both deterministic and stochastic. One thing to note is that PySB model are written in a domain specific langauge that somewhat abuses python normal style.

### Base of the Model
1. The base of the model was inspired by a model from the *Modelling the actions of chaperones and their role in ageing*(**Citation Here**), where we adopted most of their model with a few modification added.
2. We omitted the dimerization of the protein in our process since it does not contribute much to the effective of the holding activity in the model while the same time increase the complexity of the model.
3. sHSP will only perform there function while in the mitochondria/cholroplast(this is a simplification of the model)
4. 

### Assumption of the model
Part of the table were a replicate of the paper(cite) with slight modifications.
---
|Reaction Name | Reaction | Parameter | Default value | Assumption
|---|---|---|---|---|
| Protein Synthesis| \\(\ce{\varnothing ->[k_{1}] NatP}\\) | \\(k_{1}\\) | \\(10.0\\) | this should be a normal value
| Misfolding| \\(\ce{NatP + ROS ->[k_{2}] MisP + ROS}\\) | \\(k_{2}\\) | \\(0.00002\\) | Ratio of native:misfolded proteins is 19:1 under normal conditions
| Binding and dissociation of misfoldedprotein with Hsp90| \\(\ce{MisP + {Hsp\{90}} <=>[k_{3}][k_{4}] MCom}\\) | \\(k_{3}, k_{4}\\)| \\(50.0\\) | The binding affinity of misfolded protein to Hsp90 isless than that of HSF1.The rate of unsuccessful refolding is low compared to refolding under normal conditions
| Protein Refolding| \\(\ce{MisP + ATP ->[k_{5}] NatP + Hsp\{90}+ADP}\\) | \\(k_{5}\\) | \\(4.0\times 10^{-6}\\)| Rapid reaction when bound to Hsp90
| Protein degradations|  \\(\ce{MisP + ATP ->[k_{6}] ADP}\\) | \\(k_{6}\\) | \\(6.0\times 10^{-7}\\) | Half-life of 6–7days
| Protein aggregation| \\(\ce{2MisP ->[k_{7}] AggP}\\) | \\(k_{7}\\) | \\(1.0\times 10^{-7}\\) | This is a slow reaction unless high levels of misfolded protein
| Binding of HSF1 and HSP90 and dissociation| \\(\ce{Hsp\{90} +HSF\{1} <=>[k_{8}][k_{9}] HCom}\\) | \\(k_{8}, k_{9}\\) | \\(500, 1.0\\) | The affinity of HSF1for Hsp90 is 10 timesstronger than that of misfolded proteins. Under normal conditions most of HSF1 is complexed to Hsp90
| Dimerisation of HSF1 and dissociation| \\(\ce{2HSF\{1} <=>[k_{10}][k_{13}] DiH}\\) | \\(k_{10}, k_{13}\\) | \\(0.01, 0.5\\) | This reaction is rapid only when levels of unbound HSF1 are high. \\(k_{13}\\) This is a slow reaction
| Trimerisation of HSF1 and dissociation| \\(\ce{DiH + HSF\{1} <=>[k_{11}][k_{12}] TriH}\\) | \\(k_{11}, k_{12}\\) | \\(100 , 0.5\\) | This is a fast reaction once dimers are formed. This is a slow reaction
| Binding of HSE andHSF1-trimers and dissociation| \\(\ce{TriH + HSE <=>[k_{14}][k_{15}] HSETriH}\\) | \\(k_{14}, k_{15}\\)| \\(0.05\\) | This reaction only proceeds when trimers are available. If all HSF1 forms trimers, the ratio of the forward to reverse reaction is about 1000:1
| Hsp90 transcription & translation| \\(\ce{HSETriH ->[k_{16}] HSETriH + Hsp\{90}}\\) | \\(k_{16}\\)| \\(1000.0\\) | This is fast when HSE is bound
| Hsp90 degradation | \\(\ce{Hsp\{90} + ATP ->[k_{17}] ADP}\\) | \\(k_{17}\\) | \\(8.02\times 10^{-9}\\)| Half-life of 1 day
| ATP formation and expenditure | \\(\ce{ADP <=>[k_{18}][k_{19}] ADP}\\) |  \\(k_{18}, k_{19}\\) | \\(12.0, 0.02\\) | Assume that ratio of ATP:ADP is 10:1 under normal conditions
| ROS production and base removal | \\(\ce{\varnothing <=>[k_{20}][k_{21}] ROS}\\) | \\(k_{20}, k_{21}\\) | \\(0.1, 0.001\\) | Assume constant production level of ROS
| ROS reduction | \\(\ce{ROS + Reduced Glutathione ->[k_{22}] Oxidised Glutathione}\\) |  \\(k_{22}\\) | \\(20.0\\) | Assuming this is a fast reaction
| Glutathione reduction | \\(\ce{Oxidised Glutathione ->[k_{34}] Reduced Glutathione}\\) | \\(k_{34}\\) | \\(0.1\\) | Assuming this is related to the Glutathione concentration
| sHSP binding | \\(\ce{MitosHsp + MisP <=>[k_{23}][k_{36}] MisPsHsp}\\) | \\(k_{23}, k_{36}\\) | \\(50.0, 0.2\\) |  the rate of unsuccessful binding is low compared to binding
| sHSP fail to hold | \\(\ce{MitosHsp + MisP <=>[k_{23}][k_{36}] MisPsHsp}\\) | \\(k_{24}\\) | \\(1.0\\) | *Substrates of the chloroplast small heat shock proteins 22E/F point to thermolability as a regulative switch for heat acclimation in Chlamydomonas reinhardtii*
| HSP90 binding on MisPsHSP | \\(\ce{Hsp\{90} + MisPsHsp <=>[k_{25}][k_{26}] HspMisPsHsp}\\) | \\(k_{25}, k_{26}\\) |\\(50.0, 5.0\\) | the rate of unsuccessful binding is low compared to binding
| Refolding with sHSP | \\(\ce{HspMisPsHsp + ATP ->[k_{27}] Hsp\{90} + MisP + sHsp + ADP}\\) | \\(k_{27}\\) | \\(10.0\\) | relatively slow since it needs energy(Double check this assumption)
| Activation of ROS by OxyR | \\(\ce{inactivate OxyR + ROS ->[k_{28}] active OxyR + ROS}\\) | \\(k_{28}\\) | \\(20.0\\) | Relatively fast process since it need to respond relatively fast
| Active OxyR binding DNA | \\(\ce{activate OxyR + sHspGlu <=>[k_{32}][k_{33}] OxyRsHspGlu}\\) | \\(k_{32}, k_{33}\\) | \\(20.0, 5.0\\) | the rate of unsuccessful binding is low compared to binding(Think about how to represent that part of the DNA)
| sHSP synthesis | \\(\ce{OxyRsHspGlu ->[k_{29}] NonMitosHsp + active OxyR + sHspGlu}\\) | \\(k_{29}\\) | \\(10.0\\) | normal synthesis rate 
| sHSP transfer | \\(\ce{MitosHsp ->[k_{35}] NonMitosHsp}\\) | \\(k_{35}\\) | \\(10.0\\) | normal rate of transfer 
| Glutathione Synthetase production Synthesis | \\(\ce{OxyRsHspGlu ->[k_{30}] active OxyR + sHspGlu}\\) | \\(k_{30}\\) | \\(10.0\\) | normal synthesis rate
| Glutathione Production | \\(\ce{OxyRsHspGlu ->[k_{31}] active OxyR + sHspGlu}\\) | \\(k_{31}\\) | \\(5.0\\) | normal synthesis rate 


Since we cannot formalize a equation where the temperature relates to the rate constant(double check if Arrhenius equation applies to it), hence we decided to the temperature simulation in a qualitative manner.
We picked a few of the parameters relating to temp change,
    - (\\(k_{1}\\)) goes down if temperature goes up
    - (\\(k_{29}, k_{30}, k_{6}, k_{20}\\)) go up if temperature rises
    - But also have to run this comparing the base_model with the HSP22E and Glutathione model to see if the misfolding gets better as a result of the tuning of our para or its actually getting better because of the sHSP and glutathione

![Figure 1)[Flow chart]

!(Figure 2)[Graph_1.jpg]

!(Figure 3)[Graph 2]

### stochastic and deterministic

a bunch of graphs. rest are either stochastic or determinisitic

## Comparison

## Discussion
### Limitations
We used the opensource package developed by .........(fill this in). However, we experienced some techinical difficulties in incorporating the temperature feature in the model where we used `Expression` in the PySB package. Thanks to Rodrigo Santibáñez(might or might not mention) a active member in the PySB community helped us ......
Due to time contraint we choose to not use the `Expression` feature in PySB, instead we run multiple rounds of different rate contant(\\(k_{20}\\)) to represent the model behaviour at different temperature.
## Analysis and Results
## Conclusion
## Future direction
## Evalation and advice to future teams

Initially we attempted to use Simbiology package of Matlab but found it difficult to collaborate on due to binary file format.


(Link to code)[code.zip]



## Reference
