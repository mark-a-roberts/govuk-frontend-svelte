<script module lang="ts">
	interface ITextOrHtml {
		text?: string;
		html?: string;
	}

	type ILevel = number;

	export { htmlOrText, type ITextOrHtml };
</script>

{#snippet htmlOrText(item: ITextOrHtml, level: ILevel)}
	{#if item.html}
		{@html item.html}
	{:else}
		{item.text}
	{/if}
{/snippet}
