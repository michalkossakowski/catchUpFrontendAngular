import { Pipe, PipeTransform } from '@angular/core';
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';

@Pipe({
  standalone: true,
  name: 'schoolingFilter'
})

export class FilterSchoolingPipe implements PipeTransform {
  transform(items: FullSchoolingDto[], ...args: string[]): any {
    const filterValue = args[0];
    if (!filterValue) {
      return items;
    }
    const filteredSchoolings = items.filter(el => {
      return el.schooling.title.toLowerCase().includes(filterValue.toLowerCase()) ;
    });
    return filteredSchoolings;
  }
}

@Pipe({
  standalone: true,
  name: 'priorityFilter'
})

export class PriorityFilterPipe implements PipeTransform {
  transform(items: any[], minPriority: number): any[] {
    if (!items || minPriority === undefined) {
      return items;
    }
    return items.filter(item => item.schooling.priority >= minPriority);
  }
}

@Pipe({
  standalone: true,
  name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform {
  transform(items: any[], selectedCategory: string): any[] {
    if (!items || !selectedCategory) {
      return items;
    }
    return items.filter(item => item.category.id.toString() === selectedCategory);
  }
}

@Pipe({
  standalone: true,
  name: 'sortSchoolings'
})

export class SortSchoolingsPipe implements PipeTransform {
  transform(
    schoolings: any[],
    sortBy: string,
    sortDirection: string
  ): any[] {
    if (!schoolings || !sortBy) return schoolings;
    return schoolings.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.schooling.title.localeCompare(b.schooling.title);
      } else if (sortBy === 'priority') {
        comparison = a.schooling.priority - b.schooling.priority;
      } else if (sortBy === 'category') {
        const categoryA = a.category?.name || '';
        const categoryB = b.category?.name || '';
        comparison = categoryA.localeCompare(categoryB);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}