<script lang="ts">
	import { htmlOrText, type ITextOrHtml} from '$lib/GDS/helpers/htmlOrText.svelte';
	import { govukI18nAttributes } from '$lib/GDS/helpers/i18nAttributes.svelte';
	let {
		classes,
		attributes,
		id,
		rememberExpanded,
		items,
		hideAllSectionsText,
		hideSectionText,
		hideSectionAriaLabelText,
		showAllSectionsText,
		showSectionText,
		showSectionAriaLabelText
	 }: { classes?: string | string[],
		attributes?: any,
		rememberExpanded?: string,
		id?: string | number,
		text: string,
		href: string,
		items?: any[],
		hideAllSectionsText?: string,
		hideSectionText?: string,
		hideSectionAriaLabelText?: string,
		showAllSectionsText?: string,
		showSectionText?: string,
		showSectionAriaLabelText?: string
	} = $props();

	interface IParam {
		[key:string]: any
	}

	interface IAccordionItem {
		expanded: boolean, heading: ITextOrHtml, summary?: ITextOrHtml, content: ITextOrHtml
	}

	type TIndex = string | number;
</script>


{#snippet _accordionItem(params: IParam, item: IAccordionItem, index: TIndex)}
{@const headingLevel = params.headingLevel ?? 2 }
<div class={["govuk-accordion__section", item.expanded && 'govuk-accordion__section--expanded']}>
	<div class="govuk-accordion__section-header">
		<svelte:element this={'h'+headingLevel} class="govuk-accordion__section-heading">
		<span class="govuk-accordion__section-button" id="{ params.id }-heading-{ index }">
			{@render htmlOrText(item?.heading, 6)}
        </span>
		</svelte:element>
		{#if item?.summary?.html || item?.summary?.text }
		<div class="govuk-accordion__section-summary govuk-body" id="{ params.id }-summary-{ index }">
			{@render htmlOrText(item.summary, 8)}
		</div>
		{/if}
	</div>
	<div id="{ params.id }-content-{ index }" class="govuk-accordion__section-content">
		{#if item.content.html }
			{@render htmlOrText({html: item.content.html  }, 6)}
		{:else if item.content.text }
		<p class="govuk-body">
			{item.content.text.trim().indent(8)}
		</p>
		{/if}
	</div>
</div>
{/snippet}

{@const wibble = false}

<div class={["govuk-accordion", classes]} data-module="govuk-accordion" {id}
		 {#if true }
		 {...govukI18nAttributes({
			 key: 'hide-all-sections',
			 message: hideAllSectionsText })}

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
		 }) }

		 {...govukI18nAttributes({
			 key: 'show-section-aria-label',
			 message: showSectionAriaLabelText
		 }) }
		 {/if}
		 data-remember-expanded={encodeURI(rememberExpanded) }}
		 {...attributes} >
	{#each items as item, loop}
	{#if item}
		{ _accordionItem(params, item, loop.index) }}
	{/if}
	{/each}
</div>
