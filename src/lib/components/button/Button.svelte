<script lang="ts">
	import { htmlOrText, type ITextOrHtml } from '$lib/GDS/helpers/htmlOrText.svelte';
	import { govukAttributes } from '$lib/GDS/helpers/attributes.svelte';

	interface Item extends ITextOrHtml {
		href: string;
		attributes: { [key: string]: any };
	}

	let {
		classes,
		attributes,
		href,
		html,
		text,
		element,
		isStartButton,
		disabled,
		preventDoubleClick
	}: {
		classes?: string | string[];
		attributes?: any;
		href?: string,
		html?: string,
		text?: string,
		element?: string,
		isStartButton?: boolean,
		disabled?: boolean
		preventDoubleClick?: boolean
	} = $props();
</script>

/// Set classes for this component

<!-- Determine type of element to use, if not explicitly set -->
{@const myElement = element ?? (href ? 'a' : 'button') }

<!--
	The SVG needs `focusable="false"` so that Internet Explorer does not
	treat it as an interactive element - without this it will be
	'focusable' when using the keyboard to navigate. -->

{#snippet _startIcon() }
<svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
	<path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/>
</svg>
{/snippet}

<!-- Define common attributes that we can use across all element types -->
{@const commonAttributes = {{
	'class': ["govuk-button", classes, isStartButton && "govuk-button--start"],
	"data-module": "govuk-button",
	{...attributes}
	{id}
}}

{#- Define common attributes we can use for both button and input types #}

{@const buttonAttributes={
	{ name }
	{disabled}
	aria-disabled: {disabled}
	data-prevent-double-click: { preventDoubleClick }
}


{#- Actually create a button... or a link! #}

{#if myElement === 'a' }
<a href={href  ?? '#' } role="button" draggable="false" {...commonAttributes  }>
	{@render htmlOrText({html, text}, 2)}
	{#if isStartButton}{@render _startIcon()}{/if}
</a>

{:else if myElement === 'button' }
<button {value} type={type ?? "submit"} {...buttonAttributes} {...commonAttributes}>
	{@render htmlOrText({html, text}, 2)}
	{#if isStartButton}
		{@render _startIcon()}
	{/if}
</button>
{:else if myElement === 'input'}
<input value={ text } type={ type ?? 'submit' } {...buttonAttributes} {...commonAttributes}>
{/if}
