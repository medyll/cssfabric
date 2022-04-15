# Welcome to cssfabric


Willing to bring my utility-first 2011 css framework to a more decent life !


This is also a learning point about gulp, webpack, packages and friends.

> yaocf !


<br/>

## Incoming features


<br/>

| modules |     |
| ------- | --- |
| cssfabric | cssfabric global config variables
animation | cssfabric simplest animation module
box | cssfabric box module to set heights, paddings, margins and shadows on all html elements
base | cssfabric base config variables
color | cssfabric color system: its about colors
grid | cssfabric flex grid system module
menu | cssfabric menu module to set menu style
overflow | cssfabric overflow module to set overflow styles on all html elements
scale | cssfabric scale module to set dimensions and ratios on all html elements
table | cssfabric table module to set different table styles
text | cssfabric text module to set text style on all html elements
theme | 
zindex | cssfabric zindex module to set z-index on all html elements |


<br/>




<br/>

### More details

---

#### <strong>module box</strong>

#### [padding]


- padding properties for html elements


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  pad
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: _&nbsp;&nbsp;t&nbsp;&nbsp;b&nbsp;&nbsp;l&nbsp;&nbsp;r&nbsp;&nbsp;all&nbsp;&nbsp;u&nbsp;&nbsp;ii&nbsp;&nbsp;tb
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _</span>: _&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;8

#### [margin]


- margin properties for html elements


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  marg
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: _&nbsp;&nbsp;t&nbsp;&nbsp;b&nbsp;&nbsp;l&nbsp;&nbsp;r&nbsp;&nbsp;all&nbsp;&nbsp;u&nbsp;&nbsp;ii&nbsp;&nbsp;tb
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _</span>: _&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;8

#### [border]


- border properties for html elements


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  border
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: _&nbsp;&nbsp;t&nbsp;&nbsp;b&nbsp;&nbsp;l&nbsp;&nbsp;r&nbsp;&nbsp;all&nbsp;&nbsp;u&nbsp;&nbsp;ii&nbsp;&nbsp;tb
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _</span>: _&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;5

#### [shadow]


- applying shadows give depth and levels to your design


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  shad
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _</span>: 2&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;&nbsp;32&nbsp;&nbsp;&nbsp;&nbsp;64&nbsp;&nbsp;&nbsp;&nbsp;128&nbsp;&nbsp;&nbsp;&nbsp;256

---

#### <strong>module color</strong>

#### [color]


- color for text level html elements


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  color
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: scheme&nbsp;&nbsp;palette&nbsp;&nbsp;gray

#### [background-color]


- background colors


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  bg
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: scheme&nbsp;&nbsp;palette&nbsp;&nbsp;gray

#### [background-themed]


- same as background-color, but with added contrasted color to text


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  bg-themed
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: scheme&nbsp;&nbsp;palette&nbsp;&nbsp;gray

#### [border-color]


- border colors are slightly darker to maximize surrounding effect


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  border-color
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: palette&nbsp;&nbsp;gray

---

#### <strong>module grid</strong>

#### [grid]


- a classic grid system, and hey, it gets height !


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  grid
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: v&nbsp;&nbsp;h

#### [self]


- grid children specific classnames


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  self
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: start&nbsp;&nbsp;end&nbsp;&nbsp;stretch

---

#### <strong>module menu</strong>

#### [menu]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  menu
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: h&nbsp;&nbsp;v

---

#### <strong>module overflow</strong>

#### [overflow]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  flow
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: visible&nbsp;&nbsp;hidden&nbsp;&nbsp;clip&nbsp;&nbsp;scroll&nbsp;&nbsp;auto

#### [overflowX]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  flowX
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: visible&nbsp;&nbsp;hidden&nbsp;&nbsp;clip&nbsp;&nbsp;scroll&nbsp;&nbsp;auto

#### [overflowY]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  flowY
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: visible&nbsp;&nbsp;hidden&nbsp;&nbsp;clip&nbsp;&nbsp;scroll&nbsp;&nbsp;auto

---

#### <strong>module scale</strong>

#### [scale]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  scale
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: w&nbsp;&nbsp;h
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _size</span>: full&nbsp;&nbsp;&nbsp;&nbsp;mid&nbsp;&nbsp;&nbsp;&nbsp;quarter&nbsp;&nbsp;&nbsp;&nbsp;tiers<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _content</span>: content-max&nbsp;&nbsp;&nbsp;&nbsp;content-min<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _defined-steps</span>: 1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;&nbsp;24&nbsp;&nbsp;&nbsp;&nbsp;32&nbsp;&nbsp;&nbsp;&nbsp;48&nbsp;&nbsp;&nbsp;&nbsp;64<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _grid-5</span>: 1-5&nbsp;&nbsp;&nbsp;&nbsp;2-5&nbsp;&nbsp;&nbsp;&nbsp;3-5&nbsp;&nbsp;&nbsp;&nbsp;4-5&nbsp;&nbsp;&nbsp;&nbsp;5-5<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- _grid-12</span>: 1-12&nbsp;&nbsp;&nbsp;&nbsp;2-12&nbsp;&nbsp;&nbsp;&nbsp;3-12&nbsp;&nbsp;&nbsp;&nbsp;4-12&nbsp;&nbsp;&nbsp;&nbsp;5-12&nbsp;&nbsp;&nbsp;&nbsp;6-12&nbsp;&nbsp;&nbsp;&nbsp;7-12&nbsp;&nbsp;&nbsp;&nbsp;8-12&nbsp;&nbsp;&nbsp;&nbsp;9-12&nbsp;&nbsp;&nbsp;&nbsp;10-12&nbsp;&nbsp;&nbsp;&nbsp;11-12&nbsp;&nbsp;&nbsp;&nbsp;12-12

---

#### <strong>module table</strong>

#### [table]


- is a table


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  table

---

#### <strong>module text</strong>

#### [text-transform]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  text
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: cap&nbsp;&nbsp;up&nbsp;&nbsp;low&nbsp;&nbsp;none&nbsp;&nbsp;full

#### [font-weight]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  text

#### [text-align]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  text
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: l&nbsp;&nbsp;r&nbsp;&nbsp;center&nbsp;&nbsp;justify

#### [text-shadow]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  text-shad

---

#### <strong>module theme</strong>

#### [theme]


 - <span style='width:80px;display:inline-block;overflow:visible'><b>shorthand</b></span>:  theme
 - <span style='width:80px;display:inline-block;overflow:visible'><b>keys</b></span>: text&nbsp;&nbsp;bg&nbsp;&nbsp;border
 - <span style='width:80px;display:inline-block;overflow:visible'><b>level keys</b></span>:<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- primary</span>: _&nbsp;&nbsp;&nbsp;&nbsp;light&nbsp;&nbsp;&nbsp;&nbsp;lighter&nbsp;&nbsp;&nbsp;&nbsp;dark&nbsp;&nbsp;&nbsp;&nbsp;darker&nbsp;&nbsp;&nbsp;&nbsp;complement&nbsp;&nbsp;&nbsp;&nbsp;invert<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- secondary</span>: _&nbsp;&nbsp;&nbsp;&nbsp;light&nbsp;&nbsp;&nbsp;&nbsp;lighter&nbsp;&nbsp;&nbsp;&nbsp;dark&nbsp;&nbsp;&nbsp;&nbsp;darker&nbsp;&nbsp;&nbsp;&nbsp;complement&nbsp;&nbsp;&nbsp;&nbsp;invert<br/><span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- tertiary</span>: _&nbsp;&nbsp;&nbsp;&nbsp;light&nbsp;&nbsp;&nbsp;&nbsp;lighter&nbsp;&nbsp;&nbsp;&nbsp;dark&nbsp;&nbsp;&nbsp;&nbsp;darker&nbsp;&nbsp;&nbsp;&nbsp;complement&nbsp;&nbsp;&nbsp;&nbsp;invert
