<script lang="ts">
	import { htmlOrText } from '$lib/GDS/helpers/htmlOrText.svelte';

	let {
		html,
		text,
		classes,
		attributes
	}: { html?: string; text?: string; classes?: string | string[]; attributes?: any } = $props();
</script>

<strong class={['govuk-tag', classes]} {...attributes}>
	{@render htmlOrText({ html, text }, 2)}
</strong>
