import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGlobalTranslations } from "@/hooks/useGlobalTranslations";
import type { Translation } from "@/hooks/useGlobalTranslations";
import { databaseApi } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { Languages, Plus, Edit, Trash2, Search } from "lucide-react";

const SaasTranslations = () => {
  const { translations, languages, categories, loading, refreshTranslations } = useGlobalTranslations();
  const { toast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  
  const [newTranslation, setNewTranslation] = useState({
    translation_key: '',
    language: 'en',
    value: '',
    category: 'general'
  });

  const filteredTranslations = translations.filter(t => {
    const matchesLanguage = selectedLanguage === 'all' || t.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      t.translation_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.value.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  const handleAddTranslation = async () => {
    try {
      await databaseApi.createTranslation(newTranslation);
      await refreshTranslations();
      setIsAddDialogOpen(false);
      setNewTranslation({
        translation_key: '',
        language: 'en',
        value: '',
        category: 'general'
      });
      toast({
        title: "Translation Added",
        description: "New translation has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding translation:', error);
      toast({
        title: "Error",
        description: "Failed to add translation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTranslation = async () => {
    if (!editingTranslation) return;
    
    try {
      await databaseApi.updateTranslation(editingTranslation.id, {
        value: editingTranslation.value,
        category: editingTranslation.category
      });
      await refreshTranslations();
      setEditingTranslation(null);
      toast({
        title: "Translation Updated",
        description: "Translation has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating translation:', error);
      toast({
        title: "Error",
        description: "Failed to update translation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTranslation = async (id: string) => {
    try {
      await databaseApi.deleteTranslation(id);
      await refreshTranslations();
      toast({
        title: "Translation Deleted",
        description: "Translation has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting translation:', error);
      toast({
        title: "Error",
        description: "Failed to delete translation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Translation Management</h1>
          <p className="text-muted-foreground">
            Manage translations that apply across all applications and organizations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Translation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Translation</DialogTitle>
              <DialogDescription>
                Create a new translation key and value for the global system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key">Translation Key</Label>
                <Input
                  id="key"
                  value={newTranslation.translation_key}
                  onChange={(e) => setNewTranslation({
                    ...newTranslation,
                    translation_key: e.target.value
                  })}
                  placeholder="e.g., nav.dashboard"
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={newTranslation.language}
                  onValueChange={(value) => setNewTranslation({
                    ...newTranslation,
                    language: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="no">Norwegian</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">Translation Value</Label>
                <Input
                  id="value"
                  value={newTranslation.value}
                  onChange={(e) => setNewTranslation({
                    ...newTranslation,
                    value: e.target.value
                  })}
                  placeholder="Translated text"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newTranslation.category}
                  onChange={(e) => setNewTranslation({
                    ...newTranslation,
                    category: e.target.value
                  })}
                  placeholder="e.g., navigation, forms, buttons"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTranslation}>
                Add Translation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Translation Filters
          </CardTitle>
          <CardDescription>
            Filter and search through global translations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search translations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  setSelectedLanguage('all');
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

      <Card>
        <CardHeader>
          <CardTitle>Translations ({filteredTranslations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTranslations.map((translation) => (
                <TableRow key={translation.id}>
                  <TableCell className="font-mono text-sm">{translation.translation_key}</TableCell>
                  <TableCell>{translation.language.toUpperCase()}</TableCell>
                  <TableCell>{translation.value}</TableCell>
                  <TableCell>{translation.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTranslation(translation)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTranslation(translation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Translation Dialog */}
      <Dialog open={!!editingTranslation} onOpenChange={() => setEditingTranslation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Translation</DialogTitle>
            <DialogDescription>
              Update the translation value and category.
            </DialogDescription>
          </DialogHeader>
          {editingTranslation && (
            <div className="space-y-4">
              <div>
                <Label>Translation Key</Label>
                <Input value={editingTranslation.translation_key} disabled />
              </div>
              <div>
                <Label>Language</Label>
                <Input value={editingTranslation.language} disabled />
              </div>
              <div>
                <Label htmlFor="editValue">Translation Value</Label>
                <Input
                  id="editValue"
                  value={editingTranslation.value}
                  onChange={(e) => setEditingTranslation({
                    ...editingTranslation,
                    value: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="editCategory">Category</Label>
                <Input
                  id="editCategory"
                  value={editingTranslation.category || ''}
                  onChange={(e) => setEditingTranslation({
                    ...editingTranslation,
                    category: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTranslation(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTranslation}>
              Update Translation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaasTranslations;
