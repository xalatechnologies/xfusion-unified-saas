
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { databaseApi } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Edit, Eye, Download, Search } from "lucide-react";

const SaasDocumentation = () => {
  const [documentation, setDocumentation] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [viewingDoc, setViewingDoc] = useState<any>(null);
  
  const { toast } = useToast();
  
  const [newDoc, setNewDoc] = useState({
    title: '',
    content: '',
    category: '',
    slug: '',
    access_level: 'public' as 'public' | 'admin' | 'super_admin',
    is_published: false,
    tags: [] as string[]
  });

  const loadDocumentation = async () => {
    try {
      setLoading(true);
      const [docsData, categoriesData] = await Promise.all([
        databaseApi.getAllDocumentation(),
        databaseApi.getCategories()
      ]);
      
      setDocumentation(docsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading documentation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocumentation();
  }, []);

  const filteredDocs = documentation.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleAddDoc = async () => {
    try {
      const slug = generateSlug(newDoc.title);
      await databaseApi.createDocumentation({
        ...newDoc,
        slug
      });
      await loadDocumentation();
      setIsAddDialogOpen(false);
      setNewDoc({
        title: '',
        content: '',
        category: '',
        slug: '',
        access_level: 'public',
        is_published: false,
        tags: []
      });
      toast({
        title: "Documentation Created",
        description: "New documentation has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating documentation:', error);
      toast({
        title: "Error",
        description: "Failed to create documentation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDoc = async () => {
    if (!editingDoc) return;
    
    try {
      await databaseApi.updateDocumentation(editingDoc.id, {
        title: editingDoc.title,
        content: editingDoc.content,
        category: editingDoc.category,
        access_level: editingDoc.access_level,
        is_published: editingDoc.is_published
      });
      await loadDocumentation();
      setEditingDoc(null);
      toast({
        title: "Documentation Updated",
        description: "Documentation has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating documentation:', error);
      toast({
        title: "Error",
        description: "Failed to update documentation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      await databaseApi.deleteDocumentation(id);
      await loadDocumentation();
      toast({
        title: "Documentation Deleted",
        description: "Documentation has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting documentation:', error);
      toast({
        title: "Error",
        description: "Failed to delete documentation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadArchitecture = () => {
    const architectureContent = `# Unified SaaS Platform Architecture

## Overview
This platform provides a three-tier architecture supporting multiple SaaS products under one unified system.

## Architecture Tiers

### 1. SAAS Admin (Super Admin Level)
- Global theme management
- Global translation management
- Documentation management
- User role assignments
- System-wide settings

### 2. Organization Admin Level
- Organization-specific settings
- Member management
- Subscription management
- Organization branding overrides

### 3. Product Level Applications
- SupplyMantix (Maintenance & Supply Chain)
- Future products (Booking, CRM, etc.)

## Benefits
- Unified authentication and user management
- Shared organizational structure
- Centralized billing and subscriptions
- Scalable role-based access control
- Modular product architecture
- Global design system consistency

## Database Structure
- User roles with system-level and organization-level permissions
- Global theme settings with organization overrides
- Centralized translation management
- Documentation system with role-based access

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([architectureContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unified-saas-platform-architecture.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Architecture Downloaded",
      description: "Platform architecture documentation has been downloaded.",
    });
  };

  if (loading) {
    return <div>Loading documentation...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation Dashboard</h1>
          <p className="text-muted-foreground">
            Manage platform documentation and architecture guides
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadArchitecture}>
            <Download className="w-4 h-4 mr-2" />
            Download Architecture
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Documentation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Documentation</DialogTitle>
                <DialogDescription>
                  Create new documentation for the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({
                      ...newDoc,
                      title: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({
                      ...newDoc,
                      category: e.target.value
                    })}
                    placeholder="e.g., architecture, guides, api"
                  />
                </div>
                <div>
                  <Label htmlFor="access_level">Access Level</Label>
                  <Select 
                    value={newDoc.access_level}
                    onValueChange={(value: any) => setNewDoc({
                      ...newDoc,
                      access_level: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="super_admin">Super Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={newDoc.is_published}
                    onCheckedChange={(checked) => setNewDoc({
                      ...newDoc,
                      is_published: checked
                    })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div>
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({
                      ...newDoc,
                      content: e.target.value
                    })}
                    rows={8}
                    placeholder="Write your documentation in Markdown format..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDoc}>
                  Create Documentation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documentation Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {doc.title}
                    {doc.is_published ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Category: {doc.category} • Access: {doc.access_level} • 
                    Created: {new Date(doc.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingDoc(doc)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDoc(doc)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {doc.content.substring(0, 200)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Documentation Dialog */}
      <Dialog open={!!viewingDoc} onOpenChange={() => setViewingDoc(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{viewingDoc?.title}</DialogTitle>
            <DialogDescription>
              Category: {viewingDoc?.category} • Access: {viewingDoc?.access_level}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">{viewingDoc?.content}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingDoc(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Documentation Dialog */}
      <Dialog open={!!editingDoc} onOpenChange={() => setEditingDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Documentation</DialogTitle>
          </DialogHeader>
          {editingDoc && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="editTitle">Title</Label>
                <Input
                  id="editTitle"
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({
                    ...editingDoc,
                    title: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="editCategory">Category</Label>
                <Input
                  id="editCategory"
                  value={editingDoc.category}
                  onChange={(e) => setEditingDoc({
                    ...editingDoc,
                    category: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="editAccessLevel">Access Level</Label>
                <Select 
                  value={editingDoc.access_level}
                  onValueChange={(value) => setEditingDoc({
                    ...editingDoc,
                    access_level: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                    <SelectItem value="super_admin">Super Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="editPublished"
                  checked={editingDoc.is_published}
                  onCheckedChange={(checked) => setEditingDoc({
                    ...editingDoc,
                    is_published: checked
                  })}
                />
                <Label htmlFor="editPublished">Published</Label>
              </div>
              <div>
                <Label htmlFor="editContent">Content (Markdown)</Label>
                <Textarea
                  id="editContent"
                  value={editingDoc.content}
                  onChange={(e) => setEditingDoc({
                    ...editingDoc,
                    content: e.target.value
                  })}
                  rows={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDoc}>
              Update Documentation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaasDocumentation;
