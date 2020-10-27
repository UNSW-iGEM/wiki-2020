---
title: Mathematical Modelling
# subtitle: Modelling biochemical reactions to determine the effectiveness of PROTECC Coral
tags: model
summary: We modelled the main biochemical reaction happening inside Symbiodinium to determine the effectiveness of our Wet lab solution. In this model we consider the addition of sHSP and glutathionine. *WHAT WE FOUND GOES HERE*
image: zelun
---

{% include mathjax.html %}

## Why mathematical modelling
 
Mathematical modelling is a powerful tool for verifying and evaluating synthetic biology solutions. Since the ultimate target chassis Symbiodinium is hard to engineer, *in silico* verification comes in as an alternative to the normal *in vivo* strategy. In this mathematical model, we will consider the effect of the introduction of HSP22E, HSP22F and Glutathione into the system. We believe this model was able to facilitate our understanding of how HSP22E, HSP22F and glutathione can alleviate the cell condition quantitatively. However, as with all modelling, care must be taken to select values and parameters that reflect the real world.

<!-- We choose to use mathematical modelling to simulate the in-vitro conditions of symbiodinium that would result from the PROTECC Coral solution. -->

## Aim
 
The aim was to produce a model that shows the effectiveness of the solution and provides insight into how varying the quantities of HSP22E, HSP22F and Glutathione would affect the cell's response under various temperatures. We further aimed to determine the optimal conditions for a cell to trigger the thermal protective response that  we designed for the cell.


## Implementation
 
Contrary to the fact that many papers have studied the structure of the heat shock protein families, studies of a mathematical model on the heat shock activity remain sparse. However, we were able to find a paper by Carole J. Proctor (1) which models the activity of chaperones on misfolded proteins that are caused by the high level of ROS.

### Computational Language and tool
From the original paper, the model was written base on the SBML(System Biology Markup Language) which is a language developed specifically for system biology base on XML(4). However, due to the unfamiliarity of the language, we decided to switch another software package [PySB](https://pysb.org) developed by members of the Lopez Lab at Vanderbilt University and the Sorger Lab at Harvard Medical School(3). We found this python package very user-friendly while at the same time provides powerful solvers for the system both deterministic and stochastic. One thing to note is that the PySB model is written in a domain-specific language that somewhat abuses python normal style.

### Base of the Model
1. The base of the model was inspired by a model which modelled the activity of charperone in aging(1), where we adopted most of their models with a few modifications added.
2. We omitted the dimerization of the protein in our process since it does not contribute much to the effectiveness of the holding activity in the model while at the same time increasing the complexity of the model.
3. HSP22E/F will only perform their function while in the mitochondria/chloroplast(this is a simplification of the model)
---
In the section below HSP22E/F will be referred to as shSP for simplicity purpose.


### Assumption of the model
Part of the table were a replicate of the paper(1) with slight modifications.
- These are parameter under the normal state, the parameter change with respect to temperature change will be specify in the below section.
![Protein schematic](/assets/images/Model/Protein_Section.png)
![expression schematic](/assets/images/Model/expression_control.png)


---
|Reaction Name | Reaction | Parameter | Default value | Assumption
|---|---|---|---|---|
| Protein Synthesis| \\(\ce{\varnothing ->[k_{1}] NatP}\\) | \\(k_{1}\\) | \\(10.0\\) | Half-life of 6–7days(1)
| Misfolding| \\(\ce{NatP + ROS ->[k_{2}] MisP + ROS}\\) | \\(k_{2}\\) | \\(0.00002\\) | Ratio of native:misfolded proteins is 19:1 under normal conditions(1) 
| Binding and dissociation of misfoldedprotein with Hsp90| \\(\ce{MisP + {Hsp\{90}} <=>[k_{3}][k_{4}] MCom}\\) | \\(k_{3}, k_{4}\\)| \\(50.0\\) | The binding affinity of misfolded protein to Hsp90 isless than that of HSF1. The rate of unsuccessful refolding is low compared to refolding under normal conditions(1)
| Protein Refolding| \\(\ce{MisP + ATP ->[k_{5}] NatP + Hsp\{90}+ADP}\\) | \\(k_{5}\\) | \\(4.0\times 10^{-6}\\)| Rapid reaction when bound to Hsp90 if ATP levels are high.(1)
| Protein degradations|  \\(\ce{Proteins + ATP ->[k_{6}] ADP}\\) | \\(k_{6}\\) | \\(6.0\times 10^{-7}\\) | Half-life of 6–7days(1)
| Protein aggregation| \\(\ce{2MisP ->[k_{7}] AggP}\\) | \\(k_{7}\\) | \\(1.0\times 10^{-7}\\) | This is a slow reaction unless high levels of misfolded protein(1)
| Binding of HSF1 and HSP90 and dissociation| \\(\ce{Hsp\{90} +HSF\{1} <=>[k_{8}][k_{9}] HCom}\\) | \\(k_{8}, k_{9}\\) | \\(500, 1.0\\) | The affinity of HSF1for Hsp90 is 10 times stronger than that of misfolded proteins. Under normal conditions most of HSF1 is complexed to Hsp90(1)
| Dimerisation of HSF1 and dissociation| \\(\ce{2HSF\{1} <=>[k_{10}][k_{13}] DiH}\\) | \\(k_{10}, k_{13}\\) | \\(0.01, 0.5\\) | This reaction is rapid only when levels of unbound HSF1 are high. \\(k_{13}\\) represents a slow reaction(1)
| Trimerisation of HSF1 and dissociation| \\(\ce{DiH + HSF\{1} <=>[k_{11}][k_{12}] TriH}\\) | \\(k_{11}, k_{12}\\) | \\(100 , 0.5\\) | This is a fast reaction once dimers are formed. This is a slow reaction(1)
| Binding of HSE andHSF1-trimers and dissociation| \\(\ce{TriH + HSE <=>[k_{14}][k_{15}] HSETriH}\\) | \\(k_{14}, k_{15}\\)| \\(0.05\\) | This reaction only proceeds when trimers are available. If all HSF1 forms trimers, the ratio of the forward to reverse reaction is about 1000:1(1)
| Hsp90 transcription & translation| \\(\ce{HSETriH ->[k_{16}] HSETriH + Hsp\{90}}\\) | \\(k_{16}\\)| \\(1000.0\\) | This is fast when HSE is bound(1)
| Hsp90 degradation | \\(\ce{Hsp\{90} + ATP ->[k_{17}] ADP}\\) | \\(k_{17}\\) | \\(8.02\times 10^{-9}\\)| Half-life of 1 day(1)
| ATP formation and expenditure | \\(\ce{ADP <=>[k_{18}][k_{19}] ADP}\\) |  \\(k_{18}, k_{19}\\) | \\(12.0, 0.02\\) | Assume that ratio of ATP:ADP is 10:1 under normal conditions(1)
| ROS production and base removal | \\(\ce{\varnothing <=>[k_{20}][k_{21}] ROS}\\) | \\(k_{20}, k_{21}\\) | \\(1, 0.001\\) | Assume constant production level of ROS
| ROS reduction | \\(\ce{ROS + Reduced Glutathione ->[k_{22}] Oxidised Glutathione}\\) |  \\(k_{22}\\) | \\(20.0\\) | Assuming this is a fast reaction
| Glutathione reduction | \\(\ce{Oxidised Glutathione ->[k_{34}] Reduced Glutathione}\\) | \\(k_{34}\\) | \\(0.1\\) | Assuming this is related to the Glutathione concentration
| sHSP binding | \\(\ce{MitosHsp + MisP <=>[k_{23}][k_{36}] MisPsHsp}\\) | \\(k_{23}, k_{36}\\) | \\(50.0, 0.2\\) |  the rate of unsuccessful binding is low compared to binding
| sHSP fail to hold | \\(\ce{MitosHsp + MisP <=>[k_{23}][k_{36}] MisPsHsp}\\) | \\(k_{24}\\) | \\(1.0\\) | sHSP can be found in large protein aggregates(2)
| HSP90 binding on MisPsHSP | \\(\ce{Hsp\{90} + MisPsHsp <=>[k_{25}][k_{26}] HspMisPsHsp}\\) | \\(k_{25}, k_{26}\\) |\\(50.0, 5.0\\) | the rate of unsuccessful binding is low compared to binding
| Refolding with sHSP | \\(\ce{HspMisPsHsp + ATP ->[k_{27}] Hsp\{90} + MisP + sHsp + ADP}\\) | \\(k_{27}\\) | \\(10.0\\) | relatively slow since it needs energy(Double check this assumption)
| Activation of ROS by OxyR | \\(\ce{inactivate OxyR + ROS ->[k_{28}] active OxyR + ROS}\\) | \\(k_{28}\\) | \\(20.0\\) | Relatively fast process since it need to respond relatively fast
| Active OxyR binding DNA | \\(\ce{activate OxyR + sHspGlu <=>[k_{32}][k_{33}] OxyRsHspGlu}\\) | \\(k_{32}, k_{33}\\) | \\(20.0, 5.0\\) | the rate of unsuccessful binding is low compared to binding(Think about how to represent that part of the DNA)
| sHSP synthesis | \\(\ce{OxyRsHspGlu ->[k_{29}] NonMitosHsp + active OxyR + sHspGlu}\\) | \\(k_{29}\\) | \\(10.0\\) | normal synthesis rate 
| sHSP transfer | \\(\ce{MitosHsp ->[k_{35}] NonMitosHsp}\\) | \\(k_{35}\\) | \\(10.0\\) | normal rate of transfer 
| Glutathione Synthetase production Synthesis | \\(\ce{OxyRsHspGlu ->[k_{30}] active OxyR + sHspGlu}\\) | \\(k_{30}\\) | \\(10.0\\) | normal synthesis rate
| Glutathione Production | \\(\ce{OxyRsHspGlu ->[k_{31}] active OxyR + sHspGlu}\\) | \\(k_{31}\\) | \\(5.0\\) | normal synthesis rate

|Species | initial value (number of molecules)
|---|---|
| Native protein| 6000000 | 
| Hsp90–HSF1 complex| 5900
| Hsp90 | 300000
| HSF1 | 100
| ROS | 100
| ATP | 10000
| ADP | 1000
| HSE | 1
| sHSP| 200
| Glutathione | 100
| sHSPGluE | 1
| OxyR | 10

## Result and Analysis

Since we cannot formalize a equation where the temperature relates to the rate constant also it is not applicable to use the Arrhenius equation which we need to assume the pre-exponential factor \\(A\\) and activation energy \\(E_{a}\\) of the reaction, hence we decided to do the simulation at different temperature in a qualitative manner.
$$\textit{k} = \textit{A}e^{\frac{-E_{a}}{RT}}\textit{}$$
Given the equation, if we assume the activation energy is \\(100kJmol^{-1}\\), \\(k_{293}, k_{303}\\) is the rate constant at \\(293, 303\\) kelvin respectively, we get,
\begin{align} \frac{k_{303}}{k_{293}} & = \frac{\textit{A}e^{\frac{-E_{a}}{RT_{303}}}}{\textit{A}e^{\frac{-E_{a}}{RT_{293}}}} \\\\
& =  \frac{e^{\frac{100000}{8.314\times 303}}}{e^{\frac{100000}{8.314\times 293}}}\\\\
& = 3.874.
\end{align}
Hence, with the Arrhenius equation as guidance we decided to have a rate constant relationship as follow,
\begin{align} 1 \leq \frac{k_{elevatedT}}{k_{nomralT}} \leq 10. \end{align}
Moreover, we realized the model would deviate from the expected output if we assume it strictly follows the Arrhenius equation. Unlike chemical reaction, biochemical reaction is extensively controlled by the enzyme, given  temperature increment in the environment which would result in different levels of protein conformational change hence disobeying the Arrhenius equation.

Therefore, we abstract the temperature change to the alternation of a few parameters which relates significantly to temperature changes.  (\\(k_{1}\\)) goes down if temperature goes up, (\\(k_{2}, k_{6}, k_{20}, k_{29}, k_{30}, \\)) go up if temperature rises.

{{ '/assets/images/Model/Baseline_model_TEMP00.png#graph_output_under_nomral_temperature_with_the_baseline_model /assets/images/Model/Baseline_model_TEMP1.png#graph_output_under_higher_temperature_with_the_baseline_model' | sideBySide }}

This group of graph is the comparision of the baseline condition under different temperature. It is evident that under higher temperature the level of natural proteins goes down quite swiftly in 100 unit time. This can be seen as a baseline of the cellular responce to temperature elevation.
<!-- 
![Baseline Model](/assets/images/Model/Baseline_model_TEMP00.png)
*This is the caption, graph output under nomral condition with the baseline model*
![Baseline Model at Higher temp](/assets/images/Model/Baseline_model_TEMP1.png)
*graph output under higher temp with the baseline model* -->


After comparing the baseline model at different temperatures, we want to see how the model with sHSP and Glutathione behave which we will be referencing as the sHSP with Glutathione model afterwards.

{{ '/assets/images/Model/AddOn_model_TEMP0.png#graph_output_under_nomral_temperature_with_the_add_on_model /assets/images/Model/AddOn_model_TEMP1.png#graph_output_under_high_temperature_with_the_add_on_model' | sideBySide }}
<!-- ![Add on Model](/assets/images/Model/AddOn_model_TEMP0.png) -->
<!-- ![Add on Model at Higher Temp](/assets/images/Model/AddOn_model_TEMP1.png) -->

As you can see by comparing the baseline and add on model at higher temp, we can see that the Natural Protein in the add on model is delepting at a significantly lower rate than the Natural Protein in the baseline model.

The above comparison showed a promising result, however, it is still unclear whether sHSP or Glutathione contribute more to the alleviation of the heat stress. Therefore, graphs with only sHSP or Glutathione were plotted below.
![sHSP on Higher temp](/assets/images/Model/sHSP_model_TEMP1.png)
![Glu on Higher temp](/assets/images/Model/Glutathione_model_TEMP1.png)
From the graph, we can conclude that Glutathione is the main helper as expected since its main function is to reduce the ROS level inside the cell which is the main cause of protein misfolding.

After knowing that Glutathione is the main helper, we would also like to evaluate if frontloading the amount of Glutathione before the actual ROS level surge would be helpful for the cell to increase its survivability.
![Without Glutathione frontload at higher temp](/assets/images/Model/AddOn_model_TEMP1.png)
![With Glutathione frontload at higher temp](/assets/images/Model/Glut_FrontLoad_model_TEMP1.png)
The graph above suggested that 10 times initial frontloading of the Glutathione is not improving the state of cell further. This is largely due to the setting of the model, where a small amount of Glutathione is sufficient to oppress the ROS level inside the cell.


## Discussion
Overall, our mathematical modelling shed some insights into how our PROTECC coral solution is effective in maintaining the functionality of the cell. From the analysis of the model, we know that this is a feasible solution to combat cellular heat stress for Symbiodinium cells. Moreover, we figured out that Glutathione is the major force in lifting the cell from extreme thermality.
However, on a more negative note that most of the value of the parameter is chosen at our best estimation since reliable data were hard to obtain. Thus the model is only a rough estimation of the *in vitro* environment. Furthermore, we did not reach our original goal of evaluating the optimal condition to activate the cellular response due to the limit of time and also the difficulties in adding the quantitative measure onto the model.
Additionally, we would like to perform a sensitivity analysis in the future to further evaluate the robustness of our model and how it responds to various parameter tweaking.

### Limitations
We experienced some technical difficulties in incorporating the temperature feature in the model where we used `Expression` in the PySB package where it seems to have some bug. Thanks to Rodrigo Santibáñez an active member in the PySB community helped us with the debugging and further pointed us to the Kappa package.
Due to time constraint we choose to not use the `Expression` feature in PySB, instead we try to control the parameter values outside the model to represent the model behaviour at different temperatures.

## Evaluation and advice to future teams

Initially we attempted to use the Simbiology package of Matlab but found it difficult to collaborate on due to binary file format. Therefore, we reimplement our baseline model using the PySB package where we find it easier to collaborate. PySB has a fantastic community([PySB Gitter](https://gitter.im/pysb/pysb)) for support where you can have your questions resolved.

Initially we began by using the MATLAB SimBiology package. This proved to be obtuse to operate and difficult to collaborate on, prompting us to move to PySB (Python Systems Biology). SimBiology provided a good overview of the type of functionality and methods present in mathematical modelling tools, allowing us to quickly replicate the work done previously in SimBiology, in PySB. PySB proved to be a great learning experience due to the open code and community nature of the project.

(Link to code)[code.zip]



## Reference
