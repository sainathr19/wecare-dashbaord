"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/Badge/Badge";
import { useUserId } from "@/hooks/useUserId";
import axiosInstance from "@/lib/axios";
import { PageLoading } from "@/components/ui/page-loading";

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface PatientProfile {
  patientId: string;
  doctorId: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  gender: string;
  birthDate: string;
  age: number;
  address: {
    city: string;
    zipCode: string;
  };
  membership: string;
  joinDate: string;
  emergencyContacts: EmergencyContact[];
}

export default function PatientProfile() {
  const { userId, loading } = useUserId();
  const { toast } = useToast();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<PatientProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: res } = await axiosInstance.get(`/patient/profile?patientId=${userId}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.error) {
          throw new Error(res.error);
        }
        setProfile(res.data);
        setEditedProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, toast]);

  const handleSave = async () => {
    try {
      const { data: res } = await axiosInstance.put(
        `/patient/profile?patientId=${userId}`,
        editedProfile ,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.error) {
        throw new Error(res.error);
      }

      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (loading || !profile) {
    return <PageLoading />;
  }

  return (
    <div className="w-full">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
          <div>
            <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
            <p className="text-muted-foreground mt-1">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <Button className="px-6" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button className="px-6" onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-8 pt-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <img
                src="/dp.png"
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover border-4 border-primary/10"
              />
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </Button>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Name</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev!, name: e.target.value }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.name}</div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Email</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev!, email: e.target.value }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.email}</div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Phone</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev!, phone: e.target.value }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.phone}</div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Blood Group</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.bloodGroup}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev!, bloodGroup: e.target.value }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.bloodGroup}</div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">City</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.address.city}
                  onChange={(e) => setEditedProfile(prev => ({
                    ...prev!,
                    address: { ...prev!.address, city: e.target.value }
                  }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.address.city}</div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Zip Code</Label>
              {isEditing ? (
                <Input
                  className="h-11"
                  value={editedProfile?.address.zipCode}
                  onChange={(e) => setEditedProfile(prev => ({
                    ...prev!,
                    address: { ...prev!.address, zipCode: e.target.value }
                  }))}
                />
              ) : (
                <div className="text-lg font-medium">{profile.address.zipCode}</div>
              )}
            </div>
        </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <Label className="text-xl font-semibold">Emergency Contacts</Label>
                <p className="text-sm text-muted-foreground">People to contact in case of emergency</p>
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setEditedProfile(prev => ({
                    ...prev!,
                    emergencyContacts: [...prev!.emergencyContacts, { name: '', relation: '', phone: '' }]
                  }))}
                >
                  Add Contact
                </Button>
              )}
            </div>

            <div className="grid gap-6">
              {(isEditing ? editedProfile : profile)?.emergencyContacts.map((contact, index) => (
                <Card key={index} className="border border-muted">
                  <CardContent className="grid md:grid-cols-3 gap-6 pt-6">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Name</Label>
                          <Input
                            className="h-11"
                            value={contact.name}
                            onChange={(e) => {
                              const newContacts = [...editedProfile!.emergencyContacts];
                              newContacts[index].name = e.target.value;
                              setEditedProfile(prev => ({ ...prev!, emergencyContacts: newContacts }));
                            }}
                          />
                        </div>
                        <div>
                          <Label>Relation</Label>
                          <Input
                            value={contact.relation}
                            onChange={(e) => {
                              const newContacts = [...editedProfile!.emergencyContacts];
                              newContacts[index].relation = e.target.value;
                              setEditedProfile(prev => ({ ...prev!, emergencyContacts: newContacts }));
                            }}
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={contact.phone}
                            onChange={(e) => {
                              const newContacts = [...editedProfile!.emergencyContacts];
                              newContacts[index].phone = e.target.value;
                              setEditedProfile(prev => ({ ...prev!, emergencyContacts: newContacts }));
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <Label className="text-sm text-muted-foreground">Name</Label>
                          <div className="text-lg font-medium">{contact.name}</div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm text-muted-foreground">Relation</Label>
                          <div className="text-lg font-medium">{contact.relation}</div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm text-muted-foreground">Phone</Label>
                          <div className="text-lg font-medium">{contact.phone}</div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Label className="text-lg font-medium">Membership Status:</Label>
            <Badge 
              variant={profile.membership.toLowerCase() === "active" ? "success" : "error"}
              className="px-4 py-1 text-base"
            >
              {profile.membership}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}