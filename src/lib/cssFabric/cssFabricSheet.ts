export const cssFabricSheet = {
	display: {
		description: 'Specifies how an element is displayed',
		syntax:
			'[inline | block | contents | flex | grid | inline-block | inline-flex | inline-grid | inline-table | list-item | none | run-in | table | table-caption | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group]',
		template: 'display: {display}',
		initial: 'inline',
		appliesTo: 'all box elements',
		fabric: {
			classNames: {
				inline: 'display: inline',
				block: 'display: block',
				contents: 'display: contents',
				flex: 'display: flex',
				grid: 'display: grid',
				'inline-block': 'display: inline-block',
				'inline-flex': 'display: inline-flex',
				'inline-grid': 'display: inline-grid',
				'inline-table': 'display: inline-table',
				'list-item': 'display: list-item',
				none: 'display: none',
				'run-in': 'display: run-in',
				table: 'display: table',
				'table-caption': 'display: table-caption',
				'table-cell': 'display: table-cell',
				'table-column': 'display: table-column',
				'table-column-group': 'display: table-column-group',
				'table-footer-group': 'display: table-footer-group',
				'table-header-group': 'display: table-header-group',
				'table-row': 'display: table-row',
				'table-row-group': 'display: table-row-group'
			}
		}
	},
	appearance: {
		description: 'Specifies the appearance of an element',
		syntax: 'auto | none',
		template: 'appearance: {appearance}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				appearance: 'appearance: {appearance}'
			}
		}
	},
	'object-fit': {
		description:
			'Specifies how the contents of a replaced element should be fitted to the box established by its used height and width',
		syntax: 'fill | contain | cover | none | scale-down',
		template: 'object-fit: {object-fit}',
		initial: 'fill',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'object-fit': 'object-fit: {object-fit}'
			}
		}
	},
	'mix-blend-mode': {
		description: 'Specifies how an element is blended with its background',
		syntax:
			'normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity',
		template: 'mix-blend-mode: {mix-blend-mode}',
		initial: 'normal',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'mix-blend-mode': 'mix-blend-mode: {mix-blend-mode}'
			}
		}
	},
	ol: {
		list: {
			description: 'Specifies the type of list-item marker',
			syntax: 'list-style-type | list-style-position | list-style-image',
			template:
				'list-style: [{listStyleType}] | [{listStyleType} {listStylePosition} {listStyleImage}]',
			initial: 'disc outside none',
			appliesTo: 'all elements',
			fabric: {
				variations: {
					type: 'square | circle | disc | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha ',
					position: 'top | bottom | inside | outside',
					image: 'none'
				}
			}
		}
	},
	container: {
		flex: {
			description: 'Specifies the properties for a flex container',
			syntax:
				'flex-direction | flex-wrap | flex-flow | justify-content | align-items | align-content',
			template:
				'flex: {flexDirection} {flexWrap} {flexFlow} {justifyContent} {alignItems} {alignContent}',
			initial: '0 1 auto',
			appliesTo: 'flex containers',
			fabric: {
				variations: {
					wrap: 'wrap | no-wrap',
					direction: 'row | row-reverse | column | column-reverse'
					//flow:
				}
			}
		},
		grid: {
			description: 'Specifies the properties for a grid container',
			syntax:
				'grid-template-rows | grid-template-columns | grid-template-areas | grid-auto-rows | grid-auto-columns | grid-auto-flow | grid | grid-area | grid-row | grid-column | grid-row-start | grid-row-end | grid-column-start | grid-column-end',
			template: 'grid: {grid}',
			initial: 'none',
			appliesTo: 'grid containers'
		},

		'align-content': {
			description:
				'Specifies the alignment between the lines inside a flexible container when the items do not use all available space',
			syntax: '[normal | flex-start | flex-end | center | space-between | space-around | stretch]',
			template: 'align-content: {align-content}',
			initial: 'normal',
			appliesTo: 'flex containers',
			fabric: {
				classNames: {
					'flex-align-content': 'align-content: {align-content}'
				}
			}
		},
		'align-items': {
			description: 'Specifies the alignment for items inside a flexible container',
			syntax: '[normal | stretch | flex-start | flex-end | center | baseline]',
			template: 'align-items: {alignItems}',
			initial: 'normal',
			appliesTo: 'flex containers',
			fabric: {
				classNames: {
					'align-items': 'align-items: {alignItems}'
				}
			}
		},
		'align-self': {
			description: 'Specifies the alignment for selected items inside a flexible container',
			syntax: '[auto | normal | stretch | flex-start | flex-end | center | baseline]',
			template: 'align-self: {alignSelf}',
			initial: 'auto',
			appliesTo: 'flex items',
			fabric: {
				classNames: {
					'align-self': 'align-self: {alignSelf}'
				}
			}
		},
		placeContent: {
			description:
				'Specifies the alignment between the lines inside a flexible container when the items do not use all available space',
			syntax: '[normal | flex-start | flex-end | center | space-between | space-around | stretch]',
			template: 'place-content: {align-content} {justify-content}',
			initial: 'normal',
			appliesTo: 'flex containers',
			fabric: {
				classNames: {
					'place-content': 'place-content: {align-content}} {justify-content}'
				}
			}
		},
		placeItems: {
			description: 'Specifies the alignment for items inside a flexible container',
			syntax: '[normal | stretch | flex-start | flex-end | center | baseline]',
			template: 'place-items: {align-items} {justify-items}',
			initial: 'normal',
			appliesTo: 'flex containers',
			fabric: {
				classNames: {
					'place-items': 'place-items: {align-items} {justify-items}'
				}
			}
		},
		placeSelf: {
			description: 'Specifies the alignment for selected items inside a flexible container',
			syntax: '[auto | normal | stretch | flex-start | flex-end | center | baseline]',
			template: 'place-self: {align-self} {justify-self}',
			initial: 'auto',
			appliesTo: 'flex items',
			fabric: {
				classNames: {
					'place-self': 'place-self: {align-self} {justify-self}'
				}
			}
		},
		order: {
			description: 'Specifies the order of the flexible item',
			syntax: '[-1|0|1]',
			template: 'order: {order}',
			initial: '0',
			appliesTo: 'flex items',
			fabric: {
				classNames: {
					order: 'order: {order}'
				}
			}
		},
		masonryAutoFlow: {
			description: 'Specifies the flow of the masonry layout',
			syntax: '[ pack | next ] | [ definite-first | ordered ]',
			template: 'masonry-auto-flow: {masonryAutoFlow}',
			initial: 'none',
			appliesTo: 'masonry containers',
			fabric: {
				classNames: {
					'masonry-auto-flow': 'masonry-auto-flow: {masonryAutoFlow}'
				}
			}
		}
	},
	pointerEvents: {
		description: 'Specifies whether or not an element reacts to pointer events',
		syntax:
			'auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit | initial | unset | revert | revert-layer',
		template: 'pointer-events: {pointerEvents}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'pointer-events': 'pointer-events: {pointerEvents}'
			}
		}
	},
	placement: {
		top: {
			description: 'Specifies the top position of a positioned element',
			syntax: 'auto | length | percentage',
			template: 'top: {top}',
			initial: 'auto',
			appliesTo: 'all positioned elements',
			fabric: {
				classNames: {
					top: 'top: {top}'
				}
			}
		},
		right: {
			description: 'Specifies the right position of a positioned element',
			syntax: 'auto | length | percentage',
			template: 'right: {right}',
			initial: 'auto',
			appliesTo: 'all positioned elements',
			fabric: {
				classNames: {
					right: 'right: {right}'
				}
			}
		},
		bottom: {
			description: 'Specifies the bottom position of a positioned element',
			syntax: 'auto | length | percentage',
			template: 'bottom: {bottom}',
			initial: 'auto',
			appliesTo: 'all positioned elements',
			fabric: {
				classNames: {
					bottom: 'bottom: {bottom}'
				}
			}
		},
		left: {
			description: 'Specifies the left position of a positioned element',
			syntax: 'auto | length | percentage',
			template: 'left: {left}',
			initial: 'auto',
			appliesTo: 'all positioned elements',
			fabric: {
				classNames: {
					left: 'left: {left}'
				}
			}
		}
	},
	box: {
		position: {
			description: 'Specifies the type of positioning method used for an element',
			syntax: 'static | relative | absolute | fixed | sticky',
			template: 'position: {position}',
			initial: 'static',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					static: 'position: static',
					relative: 'position: relative',
					absolute: 'position: absolute',
					fixed: 'position: fixed',
					sticky: 'position: sticky'
				}
			}
		},
		width: {
			description: 'Specifies the width of the content area of an element',
			syntax: '[auto | length | percentage]',
			template: 'width: {width}',
			initial: 'auto',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					width: 'width: {width}',
					'min-width': 'min-width: {min-width}',
					'max-width': 'max-width: {max-width}'
				}
			}
		},
		height: {
			description: 'Specifies the height of the content area of an element',
			syntax: 'auto | length',
			template: 'height: {height}',
			initial: 'auto',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					height: 'height: {height}',
					min: 'min-height: {min-height}',
					max: 'max-height: {max-height}'
				}
			}
		},
		overflow: {
			description: 'Specifies whether or not to clip the content of an element',
			syntax: 'visible | hidden | scroll | auto',
			template: 'overflow: {overflow}',
			initial: 'visible',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					overflow: 'overflow: {overflow}',
					x: 'overflow-x: {overflow-x}',
					y: 'overflow-y: {overflow-y}'
				}
			}
		},
		margin: {
			description: 'Specifies the margin around an element',
			syntax: 'length | auto',
			template: 'margin: {margin} {margin} {margin} {margin}',
			initial: '0 0 0 0',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					margin: 'margin: {margin}',
					top: 'margin-top: {margin-top}',
					right: 'margin-right: {margin-right}',
					bottom: 'margin-bottom: {margin-bottom}',
					left: 'margin-left: {margin-left}',
					'top-bottom': 'margin: {margin-top-bottom} inherit',
					'right-left': 'margin: inherit {margin-right-left}'
				}
			}
		},
		padding: {
			description: 'Specifies the padding inside an element',
			syntax: 'length',
			template: 'padding: {padding-top} {padding-right} {padding-bottom} {padding-left}',
			initial: '0 0 0 0',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					padding: 'padding: {padding}',
					top: 'padding-top: {padding-top}',
					right: 'padding-right: {padding-right}',
					bottom: 'padding-bottom: {padding-bottom}',
					left: 'padding-left: {padding-left}',
					'top-bottom': 'padding: {padding-top-bottom} inherit',
					'right-left': 'padding: inherit {padding-right-left} '
				}
			}
		},
		contain: {
			description: 'Specifies how the container should handle its content',
			syntax: '[none | strict | content | size | layout | style | paint]',
			template: 'contain: {contain}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					contain: 'contain: {contain}'
				}
			}
		},
		container: {
			description: 'Specifies the type of container',
			syntax: 'none | container-name [/ container-type]?',
			template: 'container: {container}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					container: 'container: {container}'
				}
			}
		},
		contentVisibility: {
			description: 'Specifies whether or not an element is visible',
			syntax: '[visible | hidden | auto]',
			template: 'content-visibility: {contentVisibility}',
			initial: 'visible',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'content-visibility': 'content-visibility: {contentVisibility}'
				}
			}
		},
		resize: {
			description: 'Specifies whether or not an element is resizable',
			syntax: '[none | both | horizontal | vertical | block | inline]',
			template: 'resize: {resize}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					resize: 'resize: {resize}'
				}
			}
		},
		boxSing: {
			description: 'Specifies whether or not an element is resizable',
			syntax: '[border-box | content-box | padding-box]',
			template: 'resize: {resize}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					resize: 'resize: {resize}'
				}
			}
		},
		breakAfter: {
			description: 'Specifies the page-, column-, or region-break behavior after an element',
			syntax:
				'[auto | always | avoid | left | right | page | column | region | avoid-page | avoid-column | avoid-region]',
			template: 'break-after: {breakAfter}',
			initial: 'auto',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'break-after': 'break-after: {breakAfter}'
				}
			}
		}
	},
	filter: {
		description: 'Specifies the filter effects for an element',
		syntax:
			'none | blur  | brightness  | contrast | drop-shadow  | grayscale  | hue-rotate  | invert  | opacity  | saturate  | sepia  | url | initial | inherit | revert | unset ',
		template: 'filter: {filter}',
		initial: 'none',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				none: 'filter-blur: none',
				blur: 'filter-blur: blur({blur})',
				brightness: 'filter-brightness: brightness({brightness})',
				contrast: 'filter-contrast: contrast({contrast})',
				'drop-shadow': 'filter-drop-shadow: drop-shadow({drop-shadow})',
				grayscale: 'filter-grayscale: grayscale({grayscale})',
				'hue-rotate': 'filter-hue-rotate: hue-rotate({hue-rotate})',
				invert: 'filter-invert: invert({invert})',
				opacity: 'filter-opacity: opacity({opacity})',
				saturate: 'filter-saturate: saturate({saturate})',
				sepia: 'filter-sepia: sepia({sepia})',
				url: 'filter-url: url({url})'
			}
		}
	},
	opacity: {
		description: 'Specifies the opacity of an element',
		syntax: '{0.0,1.0}',
		template: 'opacity: {opacity}',
		initial: '1',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				opacity: 'opacity: {opacity}'
			}
		}
	},
	transition: {
		description: 'Specifies the transition effect for an element',
		syntax: '[transition] | [transition-duration | transition-timing-function |transition- delay]',
		template: 'transition: {transition} {duration} {timingFunction} {delay}',
		initial: 'none',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				transition:
					'transition: {transition} {transition-duration} {transition-timingFunction} {transition-delay}',
				'transition-property': 'transition-property: {transition-property}',
				'transition-duration': 'transition-duration: {transition-duration}',
				'transition-timing-function': 'transition-timing-function: {transition-timingFunction}',
				'transition-delay': 'transition-delay: {transition-delay}'
			}
		}
	},
	aspectRatio: {
		description: 'Specifies the aspect ratio of an element',
		syntax: 'range[0,1]',
		template: 'aspect-ratio: {aspectRatioX} / {aspectRatioY}',
		initial: '1',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'aspect-ratio': 'aspect-ratio: {aspectRatioX} / {aspectRatioY}'
			}
		}
	},
	colorScheme: {
		description: 'Specifies the color scheme used by an element',
		syntax: '[normal | light | dark] | [only light | only dark]',
		template: 'color-scheme: {colorScheme}',
		initial: 'light',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'color-scheme': 'color-scheme: {colorScheme}'
			}
		}
	},
	initialLetter: {
		description: 'Specifies the initial letter of an element',
		syntax: 'normal | drop | raised | sunken | inherit',
		template: 'initial-letter: {initialLetter}',
		initial: 'normal',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'initial-letter': 'initial-letter: {initialLetter}'
			}
		}
	},
	gap: {
		description: 'Specifies the gap between the rows and columns',
		syntax: 'length | percentage',
		template: 'gap: {gap}',
		initial: '0',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				gap: 'gap: {gap}',
				'row-gap': 'row-gap: {rowGap}',
				'column-gap': 'column-gap: {columnGap}'
			}
		}
	},
	break: {
		'break-after': {
			description: 'Specifies the page-, column-, or region-break behavior after an element',
			syntax:
				'auto | always | avoid | left | right | page | column | region | avoid-page | avoid-column | avoid-region',
			template: 'break-after: {break-after}',
			initial: 'auto',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'break-after': 'break-after: {break-after}'
				}
			}
		},
		'break-before': {
			description: 'Specifies the page-, column-, or region-break behavior before an element',
			syntax:
				'auto | always | avoid | left | right | page | column | region | avoid-page | avoid-column | avoid-region',
			template: 'break-before: {break-before}',
			initial: 'auto',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'break-before': 'break-before: {break-before}'
				}
			}
		}
	},
	backDropFilter: {
		description: 'Specifies the backdrop-filter effects for an element',
		syntax:
			'none | blur | brightness | contrast | drop-shadow | grayscale | hue-rotate | invert | opacity | saturate | sepia | url | initial | inherit | revert | unset',
		template: 'backdrop-filter: {backdropFilter}',
		initial: 'none',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'backdrop-filter-blur': 'backdrop-filter-blur: blur({blur})',
				backdropFilterBrightness: 'backdrop-filter-brightness: brightness({brightness})',
				backdropFilterContrast: 'backdrop-filter-contrast: contrast({contrast})',
				backdropFilterDropShadow: 'backdrop-filter-drop-shadow: drop-shadow({dropShadow})',
				backdropFilterGrayscale: 'backdrop-filter-grayscale: grayscale({grayscale})',
				backdropFilterHueRotate: 'backdrop-filter-hue-rotate: hue-rotate({hueRotate})',
				backdropFilterInvert: 'backdrop-filter-invert: invert({invert})',
				backdropFilterOpacity: 'backdrop-filter-opacity: opacity({opacity})',
				backdropFilterSaturate: 'backdrop-filter-saturate: saturate({saturate})',
				backdropFilterSepia: 'backdrop-filter-sepia: sepia({sepia})',
				backdropFilterUrl: 'backdrop-filter-url: url({url})'
			}
		}
	},
	boxShadow: {
		description: 'Specifies the shadow effect around an element',
		syntax:
			'none | [h-shadow v-shadow blur spread color] | [inset h-shadow v-shadow blur spread color]',
		template: 'box-shadow: {boxShadow}',
		initial: 'none',
		appliesTo: 'all box elements'
	},
	background: {
		description: 'Specifies the background properties for an element',
		syntax:
			'[background-color | background-image | background-repeat | background-attachment | background-position]',
		template:
			'background: {backgroundColor} {backgroundImage} {backgroundRepeat} {backgroundAttachment} {backgroundPosition}',
		initial: 'transparent none repeat scroll 0% 0%',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'background-color': 'background-color: {backgroundColor}',
				'background-image': 'background-image: {backgroundImage}',
				'background-repeat': 'background-repeat: {backgroundRepeat}',
				'background-attachment': 'background-attachment: {backgroundAttachment}',
				'background-position': 'background-position: {backgroundPosition}'
			}
		}
	},
	'unicode-bidi': {
		description: 'Specifies the level of embedding with respect to the bidirectional algorithm',
		syntax: 'normal | embed | bidi-override',
		template: 'unicode-bidi: {unicodeBidi}',
		initial: 'normal',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'unicode-bidi': 'unicode-bidi: {unicodeBidi}'
			}
		}
	},
	'user-select': {
		description: 'Specifies the text selection behavior',
		syntax: 'auto | text | none | contain',
		template: 'user-select: {userSelect}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'user-select': 'user-select: {userSelect}'
			}
		}
	},
	widows: {
		description:
			'Specifies the minimum number of lines that must be left at the top of a page when a page break occurs inside an element',
		syntax: 'number',
		template: 'widows: {widows}',
		initial: '2',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				widows: 'widows: {widows}'
			}
		}
	},
	'touch-action': {
		description: 'Specifies the scrolling and zooming of the content',
		syntax:
			'auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | pinch-zoom | manipulation',
		template: 'touch-action: {touchAction}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'touch-action': 'touch-action: {touchAction}'
			}
		}
	},
	cursor: {
		description: 'Specifies the type of cursor to be displayed',
		syntax:
			'auto | crosshair | default | pointer | move | e-resize | ne-resize | nw-resize | n-resize | se-resize | sw-resize | s-resize | w-resize | text | wait | help | progress',
		template: 'cursor: {cursor}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				cursor: 'cursor: {cursor}'
			}
		}
	},
	animations: {
		translate: {
			description: 'Specifies the translation of an element',
			syntax: 'none | transform-functions',
			template: 'transform: translate({translateX}, {translateY}), {translateZ})',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					transform: 'transform: translate({translateX}, {translateY}), {translateZ})'
				}
			}
		}
	},
	'vertical-align': {
		description: 'Specifies the vertical alignment of the content in an element',
		syntax:
			'baseline | sub | super | top | text-top | middle | bottom | text-bottom | length | percentage',
		template: 'vertical-align: {vertical-align}',
		initial: 'baseline',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'vertical-align': 'vertical-align: {vertical-align}'
			}
		}
	},
	visibility: {
		description: 'Specifies whether or not an element is visible',
		syntax: 'visible | hidden | collapse | initial | inherit',
		template: 'visibility: {visibility}',
		initial: 'visible',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				visibility: 'visibility: {visibility}'
			}
		}
	},
	borders: {
		border: {
			description: 'Specifies the border properties for an element',
			syntax: 'border-width | border-style | border-color',
			template: 'border: {border-width} {border-style} {border-color}',
			initial: 'medium none currentColor',
			appliesTo: 'all box elements',
			fabric: {
				/* classNames: {
					'border-width': 'border-width: {border-width}',
					'border-style': 'border-style: {border-style}',
					'border-color': 'border-color: {border-color}'
				}, */
				variations: {
					color: '(cssFab.theme) | cssFab.palette  | cssFab.status',
					style:
						'auto | none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset',
					width: 'thin | medium | thick'
				}
			}
		},
		radius: {
			description: 'Specifies the radius of the border corners',
			syntax: 'border-radius: [ length | percentage ]{1,4} [ / [ length | percentage ]{1,4} ]?',
			template: 'border-radius: {borderRadius}',
			initial: '0',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					'border-radius': 'border-radius: {border-radius}',
					'border-top-left-radius': 'border-top-left-radius: {border-top-left-radius}',
					'border-top-right-radius': 'border-top-right-radius: {border-top-right-radius}',
					'border-bottom-left-radius': 'border-bottom-left-radius: {border-bottom-left-radius}',
					'border-bottom-right-radius': 'border-bottom-right-radius: {border-bottom-right-radius}'
				}
			}
		},
		borderWidth: {
			description: 'Specifies the width of the border',
			syntax: 'length | thin | medium | thick',
			template: 'border-width: {borderWidth}',
			initial: 'medium',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					'border-width': 'border-width: {borderWidth}'
				}
			}
		},
		borderStyle: {
			description: 'Specifies the style of the border',
			syntax: 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset',
			template: 'border-style: {borderStyle}',
			initial: 'none',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					'border-style': 'border-style: {borderStyle}'
				}
			}
		},
		borderColor: {
			description: 'Specifies the color of the border',
			syntax: 'color',
			template: 'border-color: {border-color}',
			initial: 'currentColor',
			appliesTo: 'all box elements',
			fabric: {
				classNames: {
					'border-color': 'border-color: {border-color}'
				}
			}
		},
		outline: {
			description: 'Specifies the outline around an element',
			syntax: 'outline-color | outline-style | outline-width',
			template: '[outline: outline] | [{outlineColor} {outlineStyle} {outlineWidth}]',
			initial: 'invert none medium',
			appliesTo: 'all box elements',
			fabric: {
				/* classNames: {
					color: 'outline-color: {outline-color}',
					style: 'outline-style: {outline-style}',
					width: 'outline-width: {outline-width}'
				}, */
				variations: {
					color: '(cssFab.theme) | cssFab.palette  | cssFab.status',
					style:
						'auto | none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset',

					width: 'thin | medium | thick'
				}
			}
		}
	},
	font: {
		description: 'Specifies the font properties for an element',
		syntax: 'font-style | font-variant | font-weight | font-size | line-height | font-family',
		template: 'font: {fontStyle} {fontVariant} {fontWeight} {fontSize}/{lineHeight} {fontFamily}',
		initial: 'normal normal normal medium/normal sans-serif',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'font-style': 'font-style: {fontStyle}',
				'font-variant': 'font-variant: {fontVariant}',
				'font-weight': 'font-weight: {fontWeight}',
				'font-size': 'font-size: {fontSize}',
				'font-family': 'font-family: {fontFamily}',
				'line-height': 'line-height: {lineHeight}'
			}
		}
	},
	rotate: {
		description: 'Specifies the rotation of the element',
		syntax: 'angle',
		template: 'rotate: {rotate} {rotate} {rotate}',
		initial: '0',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				rotate: 'rotate: {rotate} {rotate} {rotate}'
			}
		}
	},
	scale: {
		description: 'Specifies the scale of the element',
		syntax: 'none | [number | percentage]',
		template: 'transform: scale({scale})',
		initial: '1',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				transform: 'transform: scale({scale})'
			}
		}
	},
	'scroll-snap': {
		'scroll-snap-type': {
			description: 'Specifies the scroll snapping behavior for a container element',
			syntax: 'none | x | y | block | inline | both',
			template: 'scroll-snap-type: {scroll-snap-type}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'scroll-snap-type': 'scroll-snap-type: {scroll-snap-type}'
				}
			}
		},
		'scroll-snap-align': {
			description: 'Specifies the scroll snapping behavior for a container element',
			syntax: 'none | start | end | center',
			template: 'scroll-snap-align: {scrollSnapAlign}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'scroll-snap-align': 'scroll-snap-align: {scrollSnapAlign}'
				}
			}
		},
		'scroll-margin': {
			description: 'Specifies the scroll snapping behavior for a container element',
			syntax: 'inherit | initial | unset | length | percentage',
			template:
				'scroll-margin: {scroll-margin} {scroll-margin-top} {scroll-margin-right} {scroll-margin-bottom} {scroll-margin-left}',
			initial: '0 0 0 0',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'scroll-margin': 'scroll-margin: {scroll-margin}',
					top: 'scroll-margin-top: {scroll-margin-top}',
					right: 'scroll-margin-right: {scroll-margin-right}',
					bottom: 'scroll-margin-bottom: {scroll-margin-bottom}',
					left: 'scroll-margin-left: {scroll-margin-left}'
				}
			}
		},
		'scroll-padding': {
			description: 'Specifies the scroll snapping behavior for a container element',
			syntax: 'inherit | initial | unset | length | percentage',
			template: 'scroll-padding: {scrollPadding} {scrollPadding} {scrollPadding} {scrollPadding}',
			initial: '0 0 0 0',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'scroll-padding': 'scroll-padding: {scroll-padding}',
					top: 'scroll-padding-top: {scroll-padding-top}',
					right: 'scroll-padding-right: {scroll-padding-right}',
					bottom: 'scroll-padding-bottom: {scroll-padding-bottom}',
					left: 'scroll-padding-left: {scroll-padding-left}'
				}
			}
		},
		'scroll-snap-stop': {
			description: 'Specifies the scroll snapping behavior for a container element',
			syntax: 'normal | always',
			template: 'scroll-snap-stop: {scroll-snap-stop}',
			initial: 'normal',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'scroll-snap-stop': 'scroll-snap-stop: {scrollSnapStop}'
				}
			}
		}
	},
	text: {
		'text-shadow': {
			description: 'Specifies the shadow effect for text',
			syntax: 'offset-x | offset-y | blur-radius | color',
			template: 'text-shadow: {offset-x} {offset-y} {blur-radius} {color}',
			initial: 'none none none none',
			appliesTo: 'all text elements',
			fabric: {
				classNames: {
					'text-shadow': 'text-shadow: {text-shadow}',
					'offset-x': 'text-shadow: {offset-x}',
					'offset-y': 'text-shadow: {offset-y}',
					'blur-radius': 'text-shadow: {blur-radius}',
					color: 'text-shadow: {color}'
				}
			}
		},
		'text-justify': {
			description: 'Specifies the justification method used when text-align is "justify"',
			syntax: 'auto | inter-word | inter-character | none',
			template: 'text-justify: {textJustify}',
			initial: 'auto',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-justify': 'text-justify: {textJustify}'
				}
			}
		},
		'text-indent': {
			description: 'Specifies the indentation of the first line in a text-block',
			syntax: 'noe | length | percentage',
			template: 'text-indent: {textIndent}',
			initial: '0',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-indent': 'text-indent: {textIndent}'
				}
			}
		},
		'text-align': {
			description: 'Specifies the horizontal alignment of text',
			syntax: 'left | right | center | justify | initial | inherit',
			template: 'text-align: {textAlign}',
			initial: 'left',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-align': 'text-align: {textAlign}'
				}
			}
		},
		'text-decoration': {
			description: 'Specifies the decoration added to text',
			syntax: 'none | [underline | overline | line-through | blink]',
			template: 'text-decoration: {textDecoration}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-decoration': 'text-decoration: {textDecoration}'
				}
			}
		},
		'text-transform': {
			description: 'Specifies the capitalization of text',
			syntax: 'none | [capitalize | uppercase | lowercase | initial | inherit]',
			template: 'text-transform: {text-transform}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-transform': 'text-transform: {text-transform}'
				}
			}
		},
		'text-overflow': {
			description:
				'Specifies how overflowed content that is not displayed should be signaled to the user',
			syntax: '[clip | ellipsis | string]',
			template: 'text-overflow: {text-overflow}',
			initial: 'clip',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'text-overflow': 'text-overflow: {text-overflow}'
				}
			}
		},
		whiteSpace: {
			description: 'Specifies how white-space inside an element is handled',
			syntax: 'normal | nowrap | pre | pre-line | pre-wrap | break-spaces',
			template: 'white-space: {whiteSpace}',
			initial: 'normal',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'white-space': 'white-space: {white-space}'
				}
			}
		},
		wordBreak: {
			description: 'Specifies line breaking rules for non-CJK scripts',
			syntax: 'normal | break-all | keep-all',
			template: 'word-break: {wordBreak}',
			initial: 'normal',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'word-break': 'word-break: {wordBreak}'
				}
			}
		},
		wordSpacing: {
			description: 'Specifies the spacing between words',
			syntax: 'normal | length ',
			template: 'word-spacing: {wordSpacing}',
			initial: 'normal',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'word-spacing': 'word-spacing: {wordSpacing}'
				}
			}
		},
		writingMode: {
			description: 'Specifies whether lines of text are laid out horizontally or vertically',
			syntax: 'horizontal-tb | vertical-rl | vertical-lr',
			template: 'writing-mode: {writingMode}',
			initial: 'horizontal-tb',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'writing-mode': 'writing-mode: {writingMode}'
				}
			}
		},
		hangingPunctuation: {
			description: 'Specifies whether a punctuation character may be placed outside the line box',
			syntax: '[none | first | last] | [allow-end | force-end]',
			template: 'hanging-punctuation: {hangingPunctuation}',
			initial: 'none',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'hanging-punctuation': 'hanging-punctuation: {hangingPunctuation}'
				}
			}
		},
		initialLetterAlign: {
			description: 'Specifies the alignment of the initial letter',
			syntax: 'auto | alphabetic | hanging | ideographic',
			template: 'initial-letter-align: {initialLetterAlign}',
			initial: 'auto',
			appliesTo: 'all elements',
			fabric: {
				classNames: {
					'initial-letter-align': 'initial-letter-align: {initialLetterAlign}'
				}
			}
		},
		column: {
			columnCount: {
				description: 'Specifies the number of columns an element should be divided into',
				syntax: 'number | auto',
				template: 'column-count: {columnCount}',
				initial: 'auto',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-count': 'column-count: {columnCount}'
					}
				}
			},
			columnFill: {
				description: 'Specifies how to fill columns, balanced or not',
				syntax: 'balance | auto',
				template: 'column-fill: {columnFill}',
				initial: 'balance',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-fill': 'column-fill: {columnFill}'
					}
				}
			},
			columnGap: {
				description: 'Specifies the gap between the columns',
				syntax: 'length | normal',
				template: 'column-gap: {columnGap}',
				initial: 'normal',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-gap': 'column-gap: {columnGap}'
					}
				}
			},
			'column-rule': {
				description: 'Specifies a straight line, or "rule", to be drawn between each column',
				syntax: 'column-rule | [column-rule-width | column-rule-style | column-rule-color]',
				template: 'column-rule: {columnRuleWidth} {columnRuleStyle} {columnRuleColor}',
				initial: 'medium none currentColor',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-rule':
							'column-rule: {column-rule-width} {column-rule-style} {column-rule-color}',
						color: 'column-rule-color: {column-rule-color}',
						style: 'column-rule-style: {column-rule-style}',
						width: 'column-rule-width: {column-rule-width}'
					}
				}
			},
			columnRuleColor: {
				description: 'Specifies the color of the rule between columns',
				syntax: 'color',
				template: 'column-rule-color: {columnRuleColor}',
				initial: 'currentColor',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-rule-color': 'column-rule-color: {columnRuleColor}'
					}
				}
			},
			columnRuleStyle: {
				description: 'Specifies the style of the rule between columns',
				syntax:
					'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset',
				template: 'column-rule-style: {columnRuleStyle}',
				initial: 'none',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-rule-style': 'column-rule-style: {columnRuleStyle}'
					}
				}
			},
			columnRuleWidth: {
				description: 'Specifies the width of the rule between columns',
				syntax: 'medium | thin | thick | length',
				template: 'column-rule-width: {columnRuleWidth}',
				initial: 'medium',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-rule-width': 'column-rule-width: {columnRuleWidth}'
					}
				}
			},
			columnSpan: {
				description: 'Specifies how many columns an element should span across',
				syntax: 'none | all',
				template: 'column-span: {columnSpan}',
				initial: 'none',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-span': 'column-span: {columnSpan}'
					}
				}
			},
			columnWidth: {
				description: 'Specifies the width of the columns',
				syntax: 'auto | length',
				template: 'column-width: {columnWidth}',
				initial: 'auto',
				appliesTo: 'all elements',
				fabric: {
					classNames: {
						'column-width': 'column-width: {columnWidth}'
					}
				}
			}
		}
	},
	zIndex: {
		description: 'Specifies the stack order of an element',
		syntax: 'auto | number',
		template: 'z-index: {zIndex}',
		initial: 'auto',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'z-index': 'z-index: {z-index}'
			}
		}
	},
	'tab-size': {
		description: 'Specifies the length of the tab-character',
		syntax: 'length | number',
		template: 'tab-size: {tabSize}',
		initial: '8',
		appliesTo: 'all elements',
		fabric: {
			classNames: {
				'tab-size': 'tab-size: {tab-size}'
			}
		}
	},
	table: {
		layout: {
			description: 'Specifies the algorithm used to lay out table cells, rows, and columns',
			syntax: 'auto | fixed',
			template: 'table-layout: {table-layout}',
			initial: 'auto',
			appliesTo: 'table elements',
			fabric: {
				classNames: {
					layout: 'table-layout: {table-layout}'
				}
			}
		},
		collapse: {
			description:
				'Specifies whether table borders should be collapsed into a single border or separated',
			syntax: 'collapse | separate',
			template: 'border-collapse: {border-collapse}',
			initial: 'separate',
			appliesTo: 'table elements',
			fabric: {
				classNames: {
					collapse: 'border-collapse: {borderCollapse}'
				}
			}
		},
		'border-spacing': {
			description: 'Specifies the distance between the borders of adjacent cells',
			syntax: 'length | percentage',
			template: 'border-spacing: {border-spacing}',
			initial: '0',
			appliesTo: 'table elements',
			fabric: {
				classNames: {
					'border-spacing': 'border-spacing: {border-spacing}'
				}
			}
		},
		'empty-cells': {
			description:
				'Specifies whether or not to display borders and background on empty cells in a table',
			syntax: 'show | hide',
			template: 'empty-cells: {empty-cells}',
			initial: 'show',
			appliesTo: 'table elements',
			fabric: {
				classNames: {
					'empty-cells': 'empty-cells: {empty-cells}'
				}
			}
		},
		'caption-side': {
			description: 'Specifies the placement of a table caption',
			syntax: 'top | bottom | block-start | block-end | inline-start | inline-end',
			template: 'caption-side: {caption-side}',
			initial: 'top',
			appliesTo: 'table elements',
			fabric: {
				classNames: {
					'caption-side': 'caption-side: {caption-side}'
				}
			}
		}
	}
};
