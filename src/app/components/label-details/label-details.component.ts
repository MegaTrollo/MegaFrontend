import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LabelsService} from '../../services/labels.service';
import {Label} from '../../models/Label';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.css']
})
export class LabelDetailsComponent implements OnInit {
  labelName: string;
  cardId: string;
  labelId: string;
  label: Label;
  jwtToken: string;

  constructor(private route: ActivatedRoute, private labelsService: LabelsService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.jwtToken = sessionStorage.getItem('jwtToken');
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.labelId = this.route.snapshot.paramMap.get('labelId');

    this.labelsService.getLabelByLabelId(this.labelId).subscribe(value => {
      this.label = value;
      this.labelName = this.label.title;
    });
  }

  editLabel(labelName: string, labelColor: string) {
    this.label.color = labelColor;
    this.label.title = labelName;
    this.labelsService.editLabel(this.label).subscribe(() => {
      this.toastr.success('Pomyślnie edytowano etykietę');
      this.router.navigate(['/card-details/' + this.cardId]);
    });
  }

  deleteLabel() {
    this.labelsService.deleteLabel(this.labelId).subscribe(() => {
      this.toastr.success('Usunięto etykiete!');
      this.router.navigate(['/card-details/' + this.cardId]);
    });
  }
}
