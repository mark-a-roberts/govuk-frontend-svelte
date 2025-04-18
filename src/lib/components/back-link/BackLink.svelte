<script lang="ts">
	interface IBackLink {
		text: string;
		href: string;
	}
	let { text = 'Back', href = '#' }: IBackLink = $props();
</script>

<a {href} class="govuk-back-link">{text}</a>
