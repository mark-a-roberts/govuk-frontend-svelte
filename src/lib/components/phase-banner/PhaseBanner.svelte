<script lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';

	import Tag from '../tag/Tag.svelte';
	let {
		classes,
		attributes,
		tag,
		html,
		text
	}: { classes?: string | string[]; attributes: any; tag: any; html?: string; text?: string } =
		$props();
</script>

<div class={['govuk-phase-banner', classes]} {...attributes}>
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
