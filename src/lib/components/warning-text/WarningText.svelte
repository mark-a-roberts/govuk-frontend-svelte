<script lang="ts">
	import { htmlOrText} from "$lib/helpers/htmlOrText.svelte";
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	interface IWarning {
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
		html?: string;
		text?: string;
		iconFallbackText?: string;
	}
	let { id, classes, attributes, html, text, iconFallbackText }: IWarning = $props();
</script>

<div {id} class={['govuk-warning-text', classes]} {...govukAttributes(attributes)}>
	<span class="govuk-warning-text__icon" aria-hidden="true">!</span>
	<strong class="govuk-warning-text__text">
		<span class="govuk-visually-hidden">{iconFallbackText ?? 'Warning'}</span>
		{@render htmlOrText({ html, text })}
	</strong>
</div>
