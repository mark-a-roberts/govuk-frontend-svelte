<script lang="ts">
	interface ISkipLink {
		text?: string;
		href?: string;
	}
	let { text = 'Skip to main content', href = '#' }: ISkipLink = $props();
</script>

<a {href} class="govuk-skip-link" data-module="govuk-skip-link">{text}</a>
