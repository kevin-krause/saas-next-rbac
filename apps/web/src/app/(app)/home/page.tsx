import { OrganizationSwitcher } from '@/components/organization-switcher'

export default async function Home() {
  return (
    <div className="space-y-4 py-2">
      <p className="text-md font-semibold">
        Start by selecting an Organization
      </p>
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <OrganizationSwitcher />
      </main>
    </div>
  )
}
