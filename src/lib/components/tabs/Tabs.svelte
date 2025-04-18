<script lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	interface ITabs {
		id?: string;
		name?: string;
		classes?: IClass;
		attributes?: IAttributes;
		html?: string;
		text?: string;
		idPrefix?: string;
		items?: { panel?: any }[];
	}
	let { id, name, classes, attributes, html, text, idPrefix, items }: ITabs = $props();
</script>

{#snippet _tabListItem(params, item, index)}
	{@const tabPanelId = item.id ?? idPrefix + '-' + index}
	<li class={['govuk-tabs__list-item', index === 1 && 'govuk-tabs__list-item--selected']}>
		<a class="govuk-tabs__tab" href="#{tabPanelId}" {...govukAttributes(item.attributes)}>
			{item.label}
		</a>
	</li>
{/snippet}

{#snippet _tabPanel(params, item, index)}
	{@const tabPanelId = item.id ?? idPrefix + '-' + index}
	<div
		class={['govuk-tabs__panel', index > 1 && 'govuk-tabs__panel--hidden']}
		id={tabPanelId}
		{...govukAttributes(item.panel.attributes)}
	>
		{#if item.panel.html}
			{item.panel.html}
		{:else if item.panel.text}
			<p class="govuk-body">{item.panel.text}</p>
		{/if}
	</div>
{/snippet}

<!-- If an id 'prefix' is not passed, fall back to using the name attribute
  instead. We need this for error messages and hints as well -->

<div {id} class={['govuk-tabs', classes]} {...govukAttributes(attributes)} data-module="govuk-tabs">
	<h2 class="govuk-tabs__title">
		{title ?? 'Contents'}
	</h2>
	{#if items?.length}
		<ul class="govuk-tabs__list">
			{#each items as item, index}
				{#if item}
					{_tabListItem(params, item, index)}
				{/if}
			{/each}
		</ul>
		{#each items as item, index}
			{#if item}
				{_tabPanel(params, item, index)}
			{/if}
		{/each}
	{/if}
</div>
