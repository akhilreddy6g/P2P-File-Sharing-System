"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Guest {
  name: string;
  email: string;
  status: "Invited" | "Accepted";
}

const GuestTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [guests, setGuests] = useState<Guest[]>([
    { name: "Alice Johnson", email: "alice@example.com", status: "Invited" },
    { name: "Bob Smith", email: "bob@example.com", status: "Accepted" },
    { name: "Carol White", email: "carol@example.com", status: "Invited" },
  ]);

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex items-center gap-10">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">All Guests</h2>
            <div className="mb-4 flex-1">
                <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                />
            </div>
        </div>

      <Table className="w-full text-sm text-left border border-gray-200 bg-white">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-3">Guest Name</TableHead>
            <TableHead className="p-3">Email</TableHead>
            <TableHead className="p-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGuests.length > 0 ? (
            filteredGuests.map((guest, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-3 py-6">{guest.name}</TableCell>
                <TableCell className="px-3 py-6">{guest.email}</TableCell>
                <TableCell className="px-3 py-6">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      guest.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {guest.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="p-3 text-center text-gray-500">
                No guests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestTable;
