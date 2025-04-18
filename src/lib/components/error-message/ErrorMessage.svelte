<script lang="ts">
	import { govukAttributes, type IKSType } from '$lib/helpers/attributes.js';
	export interface IErrorMessage {
		id?: string;
		classes?: string | string[];
		attributes?: IKSType;
		html?: string;
		text?: string;
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
