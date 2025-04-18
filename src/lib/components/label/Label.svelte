<script lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	export interface ILabel {
		id?: string;
		attributes?: IAttributes;
		classes?: IClass;
		html?: string;
		text?: string;
		isPageHeading: boolean;
		aFor?: string;
	}
	let { id, classes, attributes, html, text, isPageHeading, aFor }: ILabel = $props();
</script>

{#snippet labelHtml()}
	{#if html || text}
		<label class={['govuk-label', classes]} {...govukAttributes(attributes)} for={aFor}>
			{@render htmlOrText({ html, text }, 2)}
		</label>
	{/if}
{/snippet}

{#if isPageHeading}
	<h1 class="govuk-label-wrapper">
		{@render labelHtml()}
	</h1>
{:else}
	{@render labelHtml()}
{/if}
