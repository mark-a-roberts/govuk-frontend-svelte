<script module lang="ts">
	interface I18nAttribute {
		messages?: string[];
		message?: string;
		key: string;
	}

	export { govukI18nAttributes };
</script>

{#snippet govukI18nAttributes(params: I18nAttribute)}
	{#if params.messages}
		{#each params.messages as message, pluralRule}
			data-i18n.{params.key}.{pluralRule}={encodeURI(message)}
		{/each}
	{:else if params.message}
		data-i18n.{params.key}={encodeURI(params.message)}
	{/if}
{/snippet}
