'use client';
import { useEffect, useState } from 'react';
import { Stage, Product } from '@/types';
import {
  createStage,
  deleteStage,
  getProcessByProduct,
  updateStage
} from '@/lib/api';
import TableStage from '@/components/tableStage';

export default function StagePage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Stage | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const s = await getProcessByProduct('d14b5655cab66f625dffd1b1bf50c82d')
      setProducts(s[0].Products)
      setStages(s);
      
    } catch (error) {

    }
  };
  const totalTime = stages.reduce((sum, stage) => sum + (stage.timeWork ?? 0), 0);
  const totalMainPrice = stages.reduce((sum, stage) => sum + (stage.unitPriceMain ?? 0), 0);
  const totalSecondPrice = stages.reduce((sum, stage) => sum + (stage.unitPriceSecond ?? 0), 0);
  const handleDelete = async (id: string) => {
    await deleteStage(id);
    fetchData();
  };

  const handleSubmit = async (data: Partial<Stage>) => {
    if (editing) {
      await updateStage(editing.stageID, data);
      setEditing(null);
    } else {
      await createStage(data);
    }
    fetchData();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered = stages.filter(s =>
    s.stageName.toLowerCase().includes(search.toLowerCase()) ||
    s.Product?.style.toLowerCase().includes(search.toLowerCase())
  );

  //   const handleViewProcess = async (style: string, customer: string) => {
  //     const result = await getProcessByProduct();
  //     console.log('Process:', result);
  //   };
  return (
    <div className="p-6">
      {stages.length > 0 && (
        <h1 className="text-xl font-bold mb-4">
        <span className="text-gray-600">Sản phẩm:</span> {stages[0]?.Product?.style}{" "}
        | <span className="text-gray-600">Khách hàng:</span> {stages[0]?.Product?.customer}{" "}
        | <span className="text-gray-600">Phòng ban:</span> {stages[0]?.Department?.DepartmentName}
      </h1>
      )}
      <TableStage stages={filtered} ></TableStage>
    </div>)
}
