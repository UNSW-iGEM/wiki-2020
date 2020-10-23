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

Our model is built using the [pysb](https://pysb.org) python package for systems biology. pysb provides a number of solvers for the system that can be swapped out. We chose to compare both deterministic and stochastic solvers. {{ zotero_key | cite }}

## Assumption of the model
Blah blah

![Figure 1)[Flow chart]

!(Figure 2)[Graph_1.jpg]

!(Figure 3)[Graph 2]

## Comparison

## Discussion
### Limitations
We used the opensource package developed by .........(fill this in). However, we experienced some techinical difficulties in incorporating the temperature feature in the model where we used `Expression` in the PySB package. Thanks to Rodrigo Santibáñez(might or might not mention) a active member in the PySB community helped us ......
Due to time contraint we choose to not use the `Expression` feature in PySB, instead we run multiple rounds of different rate contant($k_{20}$) to represent the model behaviour at different temperature.
## Analysis and Results
## Conclusion
## Future direction
## Evalation and advice to future teams

Initially we attempted to use Simbiology package of Matlab but found it difficult to collaborate on due to binary file format.


(Link to code)[code.zip]



## Reference
