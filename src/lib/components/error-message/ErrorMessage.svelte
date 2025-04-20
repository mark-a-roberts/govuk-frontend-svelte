<script lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import type { IHtmlOrText } from "$lib/helpers/htmlOrText.svelte";
	export interface IErrorMessage extends IHtmlOrText {
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
		visuallyHiddenText?: string;
	}
	let {
		id,
		classes,
		attributes,
		html,
		text,
		visuallyHiddenText = 'Error'
	}: IErrorMessage = $props();
</script>

{#snippet error(errorText)}
	{#if visuallyHiddenText}
		<span class="govuk-visually-hidden">{visuallyHiddenText}:</span> {errorText}
	{:else}
		{errorText}
	{/if}
{/snippet}

<p {id} class={['govuk-error-message', classes]} {...govukAttributes(attributes)}>
	{@render error(html ?? text)}
</p>
