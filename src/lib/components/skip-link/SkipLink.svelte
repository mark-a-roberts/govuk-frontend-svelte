<script module lang="ts">
	export interface ISkipLink {
		text?: string;
		href?: string;
	}
</script>

<script>
	let { text = 'Skip to main content', href = '#' }: ISkipLink = $props();
</script>

<a {href} class="govuk-skip-link" data-module="govuk-skip-link">{text}</a>
