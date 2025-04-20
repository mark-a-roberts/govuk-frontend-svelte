<script lang="ts">
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import {
		govukAttributes,
		type IKeyString,
		type IAttributes,
		type IClass
	} from '$lib/helpers/attributes.js';
	import { govukI18nAttributes } from '../../helpers/i18nAttributes.js';

	interface IAccordion {
		classes?: IClass;
		attributes?: IAttributes;
		rememberExpanded?: string;
		id?: string | number;
		text: string;
		href: string;
		items: any[];
		headingLevel?: number;
		hideAllSectionsText?: string;
		hideSectionText?: string;
		hideSectionAriaLabelText?: string;
		showAllSectionsText?: string;
		showSectionText?: string;
		showSectionAriaLabelText?: string;
	}

	let {
		classes,
		attributes,
		id,
		rememberExpanded,
		items,
		headingLevel,
		hideAllSectionsText,
		hideSectionText,
		hideSectionAriaLabelText,
		showAllSectionsText,
		showSectionText,
		showSectionAriaLabelText
	}: IAccordion = $props();

	interface IAccordionItem {
		expanded: boolean;
		heading: IHtmlOrText;
		summary?: IHtmlOrText;
		content?: IHtmlOrText;
	}

	type TIndex = string | number;
</script>

{#snippet _accordionItem(params: IKeyString, item: IAccordionItem, index: TIndex)}
	{@const headingLevel = params.headingLevel ?? 2}
	<div class={['govuk-accordion__section', item.expanded && 'govuk-accordion__section--expanded']}>
		<div class="govuk-accordion__section-header">
			<svelte:element this={'h' + headingLevel} class="govuk-accordion__section-heading">
				<span class="govuk-accordion__section-button" id="{params.id}-heading-{index}">
					{@render htmlOrText(item?.heading, 6)}
				</span>
			</svelte:element>
			{#if item?.summary?.html || item?.summary?.text}
				<div class="govuk-accordion__section-summary govuk-body" id="{params.id}-summary-{index}">
					{@render htmlOrText(item.summary, 8)}
				</div>
			{/if}
		</div>
		<div id="{params.id}-content-{index}" class="govuk-accordion__section-content">
			{#if item.content?.html}
				{@render htmlOrText({ html: item.content.html }, 6)}
			{:else if item.content?.text}
				<p class="govuk-body">
					{item.content.text.trim()}
				</p>
			{/if}
		</div>
	</div>
{/snippet}

<div
	class={['govuk-accordion', classes]}
	data-module="govuk-accordion"
	{id}
	{...govukI18nAttributes({
		key: 'hide-all-sections',
		message: hideAllSectionsText
	})}
	{...govukI18nAttributes({
		key: 'hide-section',
		message: hideSectionText
	})}
	{...govukI18nAttributes({
		key: 'hide-section-aria-label',
		message: hideSectionAriaLabelText
	})}
	{...govukI18nAttributes({
		key: 'show-all-sections',
		message: showAllSectionsText
	})}
	{...govukI18nAttributes({
		key: 'show-section',
		message: showSectionText
	})}
	{...govukI18nAttributes({
		key: 'show-section-aria-label',
		message: showSectionAriaLabelText
	})}
	data-remember-expanded={rememberExpanded && encodeURI(rememberExpanded)}
	{...govukAttributes(attributes)}
>
	{#each items as item, loop}
		{#if item}
			{_accordionItem({ headingLevel, id }, item, loop)}}
		{/if}
	{/each}
</div>
