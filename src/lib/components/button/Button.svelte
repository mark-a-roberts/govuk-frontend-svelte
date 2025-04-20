<script lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';

	interface IButton extends  IHtmlOrText {
		id?: string;
		name?: string;
		classes?: IClass;
		attributes?: IAttributes;
		href?: string;
		value?: string;
		element?: string;
		isStartButton?: boolean;
		disabled?: boolean;
		preventDoubleClick?: boolean;
		type?: string;
	}

	let {
		id,
		name,
		classes,
		attributes,
		href,
		html,
		text,
		element,
		value,
		type = 'submit',
		isStartButton,
		disabled,
		preventDoubleClick
	}: IButton = $props();

	// Define common attributes that we can use across all element types -->
	const commonAttributes = {
		class: ['govuk-button', classes, isStartButton && 'govuk-button--start'],
		'data-module': 'govuk-button',
		...govukAttributes(attributes),
		id
	};
	const buttonAttributes = {
		name,
		disabled,
		'aria-disabled': disabled,
		'data-prevent-double-click': preventDoubleClick
	};

	const myElement = element ?? (href ? 'a' : 'button');
</script>

<!--
	The SVG needs `focusable="false"` so that Internet Explorer does not
	treat it as an interactive element - without this it will be
	'focusable' when using the keyboard to navigate. -->

{#snippet _startIcon()}
	<svg
		class="govuk-button__start-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="17.5"
		height="19"
		viewBox="0 0 33 40"
		aria-hidden="true"
		focusable="false"
	>
		<path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
	</svg>
{/snippet}

<!-- Actually create a button... or a link! -->

{#if myElement === 'a'}
	<a href={href ?? '#'} role="button" draggable="false" {...commonAttributes}>
		{@render htmlOrText({ html, text }, 2)}
		{#if isStartButton}{@render _startIcon()}{/if}
	</a>
{:else if myElement === 'button'}
	<button {value} {type} {...buttonAttributes} {...commonAttributes}>
		{@render htmlOrText({ html, text }, 2)}
		{#if isStartButton}
			{@render _startIcon()}
		{/if}
	</button>
{:else if myElement === 'input'}
	<input value={text} {type} {...buttonAttributes} {...commonAttributes} />
{/if}
