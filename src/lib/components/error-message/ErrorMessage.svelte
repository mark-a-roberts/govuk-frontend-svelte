<script lang="ts">
	import { govukAttributes } from '$lib/helpers/attributes.js';
	interface IProps {
		id?: string;
		classes?: string | string[];
		html?: string;
		text?: string;
		visuallyHiddenText?: string;
	}
	let { id, classes, attributes, html, text, visuallyHiddenText = 'Error' }: IProps = $props();
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
