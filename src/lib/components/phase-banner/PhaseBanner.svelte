<script module lang="ts">
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import Tag from '../tag/Tag.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	export interface IPhaseBanner extends IHtmlOrText {
		classes?: IClass;
		attributes: IAttributes;
		tag: any;
	}
</script>

<script lang="ts">
	let { classes, attributes, tag, html, text }: IPhaseBanner = $props();
</script>

<div class={['govuk-phase-banner', classes]} {...govukAttributes(attributes)}>
	<p class="govuk-phase-banner__content">
		{#if tag}
			<Tag
				text={tag.text}
				html={tag.html}
				classes={['govuk-phase-banner__content__tag', tag.classes]}
			/>
		{/if}
		<span class="govuk-phase-banner__text">
			{@render htmlOrText({ html, text }, 6)}
		</span>
	</p>
</div>
