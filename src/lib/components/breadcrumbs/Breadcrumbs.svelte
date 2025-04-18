<script lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes } from '$lib/helpers/attributes.js';

	interface IItem {
		href?: string;
	}

	interface IBreadcrumbs {
		classes?: string | string[];
		attributes?: any;
		collapseOnMobile?: boolean;
		labelText?: string;
		items?: IItem[];
	}

	let { classes, attributes, collapseOnMobile, labelText, items }: IBreadcrumbs = $props();
</script>

/// Set classes for this component
<nav
	class={[
		'govuk-breadcrumbs',
		classes,
		collapseOnMobile && 'govuk-breadcrumbs--collapse-on-mobile'
	]}
	{...govukAttributes(attributes)}
	aria-label={labelText ?? 'Breadcrumb'}
>
	<ol class="govuk-breadcrumbs__list">
		{#if items?.length}
			{#each items as item}
				{#if item?.href}
					<li class="govuk-breadcrumbs__list-item">
						<a
							class="govuk-breadcrumbs__link"
							href={item.href}
							{...govukAttributes(item.attributes)}
						>
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
