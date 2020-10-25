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

Mathematical modelling is a powerful tool for verifiying and evaluating sythetic biology solutions. However as with all modelling, care must be taken to select values and parameters that reflect the real world.

We chose to use mathematical modelling to simulate the in-vitro conditions of symbiodinium that would result from the PROTECC Coral solution.

## Aim

The aim is to produce a model that shows the effectiveness of the solution and provides insight into how varying the quantities of sHSP and gluthationine would effect the cell's response under various temperatures.

## Implementation

Our model is built using the [PySB](https://pysb.org) python package for systems biology. pysb provides a number of solvers for the system that can be swapped out. We chose to compare both deterministic and stochastic solvers.

PySB models are written in a domain specific language that somewhat abuses pythons normal style.

### Assumption of the model

Assumption table
---
|Reaction Name | Reaction | Parameter | Default value | Assumption
|---|---|---|---|---|
|Protein Synthesis| \\(\ce{None ->[k_{1}] NatP}\\) | \\(k_{1}\\) | 10.0 | this should be a normal value
|Misfolding| \\(\ce{NatP + ROS ->[k_{2}] MisP + ROS}\\) | \\(k_{2}\\) | 0.00002 | Ratio of native:misfolded proteins is 19:1 under normal conditions
|Binding and dissociation of misfoldedprotein with Hsp90| \\(\ce{MisP + {Hsp\{90}} <=>[k_{3}][k_{4}] MCom}\\) | \\(k_{3}, k_{4}\\)| 50.0 | .
|Protein Refolding| \\(\ce{MisP + ATP ->[k_{5}] NatP + Hsp\{90}+ADP}\\) | \\(k_{5}\\) | \\(4.0\times 10^{-6}\\)| .
|Protein degradations|  \\(\ce{MisP + ATP ->[k_{6}] ADP}\\) | \\(k_{6}\\) | \\(6.0\times 10^{-7}\\) | .
|Protein aggregation| \\(\ce{2MisP ->[k_{7}] AggP}\\) | \\(k_{7}\\) | \\(1.0\times 10^{-7}\\) | .
|Binding of HSF1 and HSP90 and dissociation| \\(\ce{Hsp\{90} +HSF\{1} <=>[k_{8}][k_{9}] HCom}\\) | \\(k_{8}\\) | 500 | .
|Dissociation of HSF1 complex| blank | \\(k_{9}\\)| 1.0| .
|Dimerisation of HSF1 and dissociation| \\(\ce{2HSF\{1} <=>[k_{10}][k_{13}] DiH}\\) | \\(k_{10}, k_{13}\\) | 0.01 , 0.5| .
|Trimerisation of HSF1 and dissociation| \\(\ce{DiH + HSF\{1} <=>[k_{11}][k_{12}] TriH}\\) | \\(k_{11}, k_{12}\\) | 100 , 0.5| .
|Binding of HSE andHSF1-trimers and dissociation| \\(\ce{TriH + HSE <=>[k_{14}][k_{15}] HSETriH}\\) | \\(k_{14}, k_{15}\\)| 0.05|.
|Hsp90 transcription & translation| \\(\ce{HSETriH ->[k_{16}] HSETriH + HSP\{90}}\\) | \\(k_{16}\\)| 1000.0| .
| Hsp90 degradation | \\(\ce{HSP\{90} + ATP ->[k_{17}] ADP}\\) | \\(k_{17}\\) | \\(8.02\times 10^{-9}\\)|.
| ATP formation and expenditure | \\(\ce{ADP <=>[k_{18}][k_{19}] ADP}\\) |  \\(k_{18}, k_{19}\\) | 12.0, 0.02 | .
| ROS production and base removal | \\(\ce{None <=>[k_{20}][k_{21}] ROS}\\) | \\(k_{20}, k_{21}\\) | 0.1, 0.001 | .


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
