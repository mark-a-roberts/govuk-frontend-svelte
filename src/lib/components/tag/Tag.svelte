<script lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	interface ITag {
		html?: string;
		text?: string;
		classes?: IClass;
		attributes?: IAttributes;
	}

	let { html, text, classes, attributes }: ITag = $props();
</script>

<strong class={['govuk-tag', classes]} {...govukAttributes(attributes)}>
	{@render htmlOrText({ html, text }, 2)}
</strong>
