<script module lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import { Hint, type IHint } from '$lib/components/hint/Hint.svelte';
	import { Label, type ILabel } from '$lib/components/label/Label.svelte';
	import {
		ErrorMessage,
		type IErrorMessage
	} from '$lib/components/error-message/ErrorMessage.svelte';
	import { htmlOrText, type IHtmlOrText } from "$lib/helpers/htmlOrText.svelte";

	export interface ITextArea extends IHtmlOrText {
		id?: string;
		name?: string;
		classes?: IClass;
		attributes?: IAttributes;
		hint: IHint;
		label: ILabel;
		formGroup: IFormGroup;
		errorMessage?: IErrorMessage;
		spellcheck: boolean;
		autocomplete: boolean;
		describedBy?: string;
		rows?: number | string;
	}
</script>

<script lang="ts">
	let {
		id,
		name,
		classes,
		attributes,
		html,
		text,
		hint,
		label,
		errorMessage,
		formGroup,
		spellcheck,
		autocomplete,
		describedBy = '',
		rows
	}: ITextArea = $props();
</script>

<!-- a record of other elements that we need to associate with the input using
  aria-describedby – for example hints or error messages -->
{@const myId = id ?? name}

<div
	class={['govuk-form-group', errorMessage && 'govuk-form-group--error', formGroup.classes]}
	{...govukAttributes(formGroup.attributes)}
>
	<Label
		html={label.html}
		text={label.text}
		classes={label.classes}
		isPageHeading={label.isPageHeading}
		attributes={label.attributes}
		for={myId}
	/>
	{#if hint}
		{@const hintId = id + '-hint'}
		{@const describedBy = describedBy ? describedBy + ' ' + hintId : hintId}
		<Hint
			id={hintId}
			classes={hint.classes}
			attributes={hint.attributes}
			html={hint.html}
			text={hint.text}
		/>
	{/if}
	{#if errorMessage}
		{@const errorId = id + '-error'}
		{@const describedBy = describedBy ? describedBy + ' ' + errorId : errorId}
		<ErrorMessage
			id={errorId}
			classes={errorMessage.classes}
			attributes={errorMessage.attributes}
			html={errorMessage.html}
			text={errorMessage.text}
			visuallyHiddenText={errorMessage.visuallyHiddenText}
		/>
	{/if}
	{#if formGroup.beforeInput}
		{@render htmlOrText(formGroup.beforeInput, 2)}
	{/if}
	<textarea
		class={['govuk-textarea', errorMessage && 'govuk-textarea--error', classes]}
		{id}
		{name}
		{rows}
		{spellcheck}
		{disabled}
		aria-describedby={describedBy}
		{autocomplete}
		{...govukAttributes(attributes)}>{value}</textarea
	>
	{#if formGroup.afterInput}
		{@render htmlOrText(formGroup.afterInput, 2)}
	{/if}
</div>
