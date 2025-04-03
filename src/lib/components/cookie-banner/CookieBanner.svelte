<script lang="ts">
	import { htmlOrText, type ITextOrHtml } from '$lib/GDS/helpers/htmlOrText.svelte';

	interface Item extends ITextOrHtml {
		href: string;
		attributes: { [key: string]: any };
	}

	let {
		classes,
		attributes,
		hidden,
		ariaLabel,
		messages
	}: {
		classes?: string | string[];
		attributes?: any;
		hidden?: boolean,
		ariaLabel?: string
		messages?: any[]
	} = $props();
</script>


<div class={["govuk-cookie-banner", classes]} data-nosnippet role="region" aria-label={ ariaLabel ?? "Cookie banner", true) }}"
  {hidden}
  {...attributes}>
  {#each messages as message}
  <div class={["govuk-cookie-banner__message", message.classes, "govuk-width-container"]} role={message.role }
			 {...message.attributes}
			 hidden={ message.hidden && "hidden"} >

	<div class="govuk-grid-row">
		<div class="govuk-grid-column-two-thirds">
			{#if message.headingHtml or message.headingText }
			<h2 class="govuk-cookie-banner__heading govuk-heading-m">
				{@render htmlOrText( { html: message.headingHtml, text: message.headingText }, 10)}
			</h2>
			{/if}
			<div class="govuk-cookie-banner__content">
				{#if message.html }
				{@html message.html | safe | trim | indent(10) }
				{:else if message.text }
				<p class="govuk-body">{ message.text }</p>
				{/if}
			</div>
		</div>
	</div>

	{#if message.actions }
	<div class="govuk-button-group">
		{#each message.action as action}
		{% set buttonHtml -%}
		{#if !action.href || (action.type == "button") }
		<Button text={action.text}
						type={action.type ?? "button"}
						name={action.name}
						value={action.value}
						classes={action.classes}
						href={action.href}
						attributes={action.attributes} />
		{:else}
		<a class={["govuk-link", action.classes]} href={ action.href }
			 {...action.attributes) }>
			{ action.text }
		</a>
		{/if}
		{%- endset %}
		{{ buttonHtml | safe | trim | indent(6) }}
		{/each}
	</div>
	{/if}

</div>
{/each}
</div>
