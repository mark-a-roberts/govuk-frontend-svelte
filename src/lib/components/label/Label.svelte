<script module lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
	export interface ILabel extends IHtmlOrText {
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
		isPageHeading: boolean;
		aFor?: string;
	}
</script>

<script lang="ts">
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
