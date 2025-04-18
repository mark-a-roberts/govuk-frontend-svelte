<script module lang="ts">
	import { govukAttributes, type IAttributes, IClass } from '$lib/helpers/attributes.js';
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';

	export interface IFieldset {
		classes?: IClass;
		attributes?: IAttributes;
		role?: string;
		describedBy?: string;
		legend?: { isPageHeading: boolean; html?: string; text?: string; classes?: IClass };
		html: string;
		caller: () => string;
	}
</script>

<script lang="ts">
	let { classes, attributes, role, describedBy, legend, html, caller }: IFieldset = $props();
</script>

<fieldset
	class={['govuk-fieldset', classes]}
	{role}
	aria-describedby={describedBy}
	{...govukAttributes(attributes)}
>
	{#if legend.html || legend.text}
		<legend class={['govuk-fieldset__legend', legend.classes]}>
			{#if legend.isPageHeading}
				<h1 class="govuk-fieldset__heading">
					{@render htmlOrText(legend, 6)}
				</h1>
			{:else}
				{@render htmlOrText(legend, 6)}
			{/if}
		</legend>
	{/if}
	{#if caller}
		<!-- if statement allows usage of `call` to be optional -->
		{caller()}
	{:else if html}
		{html}
	{/if}
</fieldset>
