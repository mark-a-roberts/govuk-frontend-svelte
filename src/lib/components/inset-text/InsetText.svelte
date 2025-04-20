<script module lang="ts">
    import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
    import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
    export interface IInsetText extends IHtmlOrText {
        id?: string;
        classes?: IClass;
        attributes?: IAttributes;
        caller?: () => string;
    }
</script>

<script lang="ts">
	let { id, classes, attributes, caller, html, text }: IInsetText = $props();
</script>

<div {id} class={['govuk-inset-text', classes]} {...govukAttributes(attributes)}>
	{#if caller}
		{caller()}
	{:else}
		{@render htmlOrText({ html, text }, 2)}
	{/if}
</div>
