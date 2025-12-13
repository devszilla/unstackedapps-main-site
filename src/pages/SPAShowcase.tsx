import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, FileText, Briefcase, GraduationCap, Linkedin, Github, UserPlus, Download, Save, X, Mail, Phone, Edit, Trash2, User } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"

type SPAType = "user-management" | "professional-resume"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

export function SPAShowcase() {
  const [selectedSPA, setSelectedSPA] = useState<SPAType>("user-management")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-wrapper flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Unstacked Apps" 
              className="brand-logo"
            />
            <div className="brand-container">
              <span className="brand-name">
                <span className="brand-name-thin">un</span>stacked
              </span>
              <span className="brand-subtitle">apps</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="sm:size-default whitespace-nowrap" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            {/* Mobile menu */}
            <div className="md:hidden flex items-center gap-2">
              <MobileMenu />
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            SPA Examples
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2">
            Interactive examples of single-page applications
          </p>
        </div>
      </section>

      {/* SPA Selector */}
      <section className="container mx-auto px-4 pb-6 sm:pb-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4">
          <Tabs 
            value={selectedSPA} 
            onValueChange={(value) => setSelectedSPA(value as SPAType)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
              <TabsTrigger value="user-management" className="gap-2">
                <Users className="h-4 w-4" />
                User Management (UMS)
              </TabsTrigger>
              <TabsTrigger value="professional-resume" className="gap-2">
                <FileText className="h-4 w-4" />
                Professional Resume
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl">
            {selectedSPA === "user-management" 
              ? "Manage users with inline editing, search, and export capabilities"
              : "Responsive resume layout optimized for all screen sizes"}
          </p>
        </div>
      </section>

      {/* SPA Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          {selectedSPA === "user-management" && <UserManagementSPA />}
          {selectedSPA === "professional-resume" && <ProfessionalResumeSPA />}
        </div>
      </section>
    </div>
  )
}

function UserManagementSPA() {
  const STORAGE_KEY = "ums_users"
  const defaultUsers: User[] = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "Admin", status: "Active", lastActive: "2 hours ago" },
    { id: 2, name: "Michael Chen", email: "michael.chen@example.com", role: "Editor", status: "Active", lastActive: "5 minutes ago" },
    { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@example.com", role: "Viewer", status: "Inactive", lastActive: "3 days ago" },
    { id: 4, name: "David Kim", email: "david.kim@example.com", role: "Editor", status: "Active", lastActive: "1 hour ago" },
  ]

  // Load users from sessionStorage or use defaults
  const loadUsers = (): User[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error("Failed to load users from sessionStorage", e)
    }
    return defaultUsers
  }

  const [users, setUsers] = useState<User[]>(loadUsers)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<User>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...users.map(u => u.id), 0)
    return maxId + 1
  })

  // Save to sessionStorage whenever users change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }, [users])

  const handleAddUser = () => {
    const newUser: User = {
      id: nextId,
      name: "New User",
      email: "newuser@example.com",
      role: "Viewer",
      status: "Active",
      lastActive: "Just now"
    }
    setUsers([...users, newUser])
    setNextId(nextId + 1)
    setEditingId(newUser.id)
    setEditData(newUser)
    setIsNewUser(true)
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setEditData({ ...user })
    setIsNewUser(false)
  }

  const handleSave = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...editData } : user
    ))
    setEditingId(null)
    setEditData({})
    setIsNewUser(false)
  }

  const handleCancel = () => {
    if (isNewUser && editingId !== null) {
      // Remove the newly added user if canceling
      setUsers(users.filter(user => user.id !== editingId))
    }
    setEditingId(null)
    setEditData({})
    setIsNewUser(false)
  }

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      setUsers(users.filter(user => user.id !== userToDelete))
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleExport = (format: "json" | "csv") => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (format === "json") {
      const dataStr = JSON.stringify(filteredUsers, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "users.json"
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const headers = ["ID", "Name", "Email", "Role", "Status", "Last Active"]
      const rows = filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastActive
      ])
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n")
      
      const dataBlob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "users.csv"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const userToDeleteName = userToDelete !== null 
    ? users.find(u => u.id === userToDelete)?.name || "this user"
    : "this user"

  return (
    <>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{userToDeleteName}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
          {/* Action bar - improved mobile layout */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddUser} className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("json")}>
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    Export as CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto sm:min-w-[200px] bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Table with vertical scroll */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Last Active</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {editingId === user.id ? (
                          <input
                            type="text"
                            value={editData.name || ""}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="px-2 py-1 border rounded text-sm w-full bg-background text-foreground"
                            autoFocus
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                        {editingId === user.id ? (
                          <input
                            type="email"
                            value={editData.email || ""}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="px-2 py-1 border rounded text-sm w-full bg-background text-foreground"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {editingId === user.id ? (
                          <select
                            value={editData.role || ""}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            className="px-2 py-1 border rounded text-sm bg-background text-foreground"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        ) : (
                          <span className="px-2 py-1 bg-secondary rounded-md text-xs">{user.role}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {editingId === user.id ? (
                          <select
                            value={editData.status || ""}
                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                            className="px-2 py-1 border rounded text-sm bg-background text-foreground"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-md text-xs ${
                            user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}>
                            {user.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                        {editingId === user.id ? (
                          <input
                            type="text"
                            value={editData.lastActive || ""}
                            onChange={(e) => setEditData({ ...editData, lastActive: e.target.value })}
                            className="px-2 py-1 border rounded text-sm w-full bg-background text-foreground"
                          />
                        ) : (
                          user.lastActive
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {editingId === user.id ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleSave(user.id)} className="h-7 w-7 p-0" title="Save">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 w-7 p-0" title="Cancel">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(user)} className="h-7 w-7 p-0" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteClick(user.id)} className="h-7 w-7 p-0" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}

function ProfessionalResumeSPA() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-left sm:text-center border-b pb-4 sm:pb-6 relative">
            <div className="absolute top-0 right-0 sm:right-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-border overflow-hidden">
                <img 
                  src="/sample_profile.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.5) translateY(15%)', objectPosition: 'center 40%' }}
                />
              </div>
            </div>
            <div className="mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">John Doe</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Senior Software Engineer</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">linkedin.com/in/johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">github.com/johndoe</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
              Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Senior Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tech Company Inc.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2020 - Present</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Lead development of scalable web applications using React and Node.js. 
                  Mentored junior developers and improved code quality standards.
                </p>
              </div>
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Startup Co.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2018 - 2020</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Built and maintained customer-facing features. Collaborated with design team 
                  to implement responsive UI components.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              Education
            </h3>
            <div className="border-l-2 pl-3 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Bachelor of Science in Computer Science</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">University of Technology</p>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">2014 - 2018</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">React</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">TypeScript</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Node.js</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">PostgreSQL</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">AWS</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Docker</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

