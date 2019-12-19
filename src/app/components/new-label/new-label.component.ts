import {Component, OnInit} from '@angular/core';
import {LabelsService} from '../../services/labels.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Label} from '../../models/Label';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.css']
})
export class NewLabelComponent implements OnInit {
  cardId;

  constructor(
    private route: ActivatedRoute,
    private labelService: LabelsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.paramMap.get('cardId');
  }

  addLabel(labelTitle: string, labelColor: string) {
    const label = new Label();
    label.title = labelTitle;
    label.color = labelColor;

    this.labelService.addLabelToCard(this.cardId, label).subscribe(data => {
      this.router.navigate(['/card-details/' + this.cardId]);
    }, error1 => {
        console.log(error1.error.message);
      });
  }
}
