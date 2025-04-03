<script lang="ts">
	import { htmlOrText, type ITextOrHtml } from '$lib/GDS/helpers/htmlOrText.svelte';

	interface Item extends ITextOrHtml {
		href: string;
		attributes: { [key: string]: any };
	}

	let {
		classes,
		attributes,
		collapseOnMobile,
		labelText,
		items
	}: {
		classes?: string | string[];
		attributes?: any;
		collapseOnMobile?: boolean;
		labelText?: string;
		items?: Item[];
	} = $props();
</script>

/// Set classes for this component
<nav
	class={[
		'govuk-breadcrumbs',
		classes,
		collapseOnMobile && 'govuk-breadcrumbs--collapse-on-mobile'
	]}
	{...attributes}
	aria-label={labelText ?? 'Breadcrumb'}
>
	<ol class="govuk-breadcrumbs__list">
		{#if items?.length}
			{#each items as item}
				{#if item?.href}
					<li class="govuk-breadcrumbs__list-item">
						<a class="govuk-breadcrumbs__link" href={item.href} {...item.attributes}>
							{@render htmlOrText(item, -1)}
						</a>
					</li>
				{:else}
					<li class="govuk-breadcrumbs__list-item" aria-current="page">
						{@render htmlOrText(item, -1)}
					</li>
				{/if}
			{/each}
		{/if}
	</ol>
</nav>
